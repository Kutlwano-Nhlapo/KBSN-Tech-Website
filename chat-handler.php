<?php
/**
 * Receives chat messages from chatbot.js and forwards them to the
 * Google Gemini API (free tier), using GEMINI_API_KEY from config.php.
 * The key never reaches the browser — this file is the only place it lives.
 *
 * Requires the "curl" PHP extension, which is enabled by default on
 * Afrihost cPanel shared hosting.
 */

header('Content-Type: application/json');
require __DIR__ . '/config.php';

function respond($status, $payload) {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input) || empty($input['messages']) || !is_array($input['messages'])) {
    respond(400, ['error' => 'messages array is required']);
}

$system = isset($input['system'])
    ? (string) $input['system']
    : 'You are a helpful assistant for a KBSN Technologies company.';

// Keep only the last 12 messages and cap each message length — protects
// against abuse and keeps free-tier daily quota from being burned quickly.
$recentMessages = array_slice($input['messages'], -12);
$contents = [];
foreach ($recentMessages as $m) {
    // Gemini uses "model" instead of "assistant" for the bot's turns.
    $role = (isset($m['role']) && $m['role'] === 'assistant') ? 'model' : 'user';
    $text = isset($m['content']) ? mb_substr((string) $m['content'], 0, 2000) : '';
    $contents[] = ['role' => $role, 'parts' => [['text' => $text]]];
}

$payload = json_encode([
    'system_instruction' => ['parts' => [['text' => $system]]],
    'contents'           => $contents,
]);

// gemini-2.5-flash is the current free-tier chat model (Aug 2026). If you
// hit quota errors, check console.ai.google.dev for the latest free-tier
// model name and swap it in below.
$model = 'gemini-3.5-flash';
$url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent";

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'x-goog-api-key: ' . GEMINI_API_KEY,
    ],
    CURLOPT_POSTFIELDS => $payload,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($response === false) {
    error_log('Chat handler cURL error: ' . $curlErr);
    respond(500, ['error' => 'Something went wrong contacting the chat service.']);
}

if ($httpCode === 429) {
    error_log('Gemini API rate limit hit: ' . $response);
    respond(429, ['error' => 'The assistant is a bit busy right now — please try again in a moment.']);
}

if ($httpCode < 200 || $httpCode >= 300) {
    respond(502, [
        'error' => 'Gemini API request failed.',
        'gemini_status' => $httpCode,
        'gemini_response' => json_decode($response, true)
    ]);
}

$data = json_decode($response, true);
$reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';

respond(200, ['reply' => $reply]);
