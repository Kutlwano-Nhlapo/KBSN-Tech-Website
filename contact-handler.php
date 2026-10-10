<?php
/**
 * Receives the contact form POST, stores it in MySQL, and emails a
 * notification to NOTIFY_EMAIL (set in config.php). Returns JSON so
 * contact-form.js can show a success/error message without reloading
 * the page.
 */

header('Content-Type: application/json');
require __DIR__ . '/config.php';

function respond($ok, $message) {
    echo json_encode(['success' => $ok, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, 'Method not allowed.');
}

// Honeypot: real visitors never fill this in, bots often do
if (!empty($_POST['_gotcha'])) {
    respond(true, 'Thanks — your message has been sent.'); // pretend success, drop silently
}

$name    = trim($_POST['name'] ?? '');
$company = trim($_POST['company'] ?? '');
$email   = trim($_POST['email'] ?? '');
$type    = trim($_POST['project_type'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '') {
    http_response_code(422);
    respond(false, 'Please fill in your name and email.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    respond(false, 'Please enter a valid email address.');
}

// Basic length limits, in case something automated is stuffing the fields
$name    = mb_substr($name, 0, 150);
$company = mb_substr($company, 0, 150);
$email   = mb_substr($email, 0, 190);
$type    = mb_substr($type, 0, 100);
$message = mb_substr($message, 0, 5000);

try {
    $db = get_db_connection();
    $stmt = $db->prepare(
        'INSERT INTO contact_submissions (full_name, company, email, project_type, message, ip_address)
         VALUES (:name, :company, :email, :type, :message, :ip)'
    );
    $stmt->execute([
        ':name'    => $name,
        ':company' => $company,
        ':email'   => $email,
        ':type'    => $type,
        ':message' => $message,
        ':ip'      => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);
} catch (PDOException $e) {
    error_log('Contact form DB error: ' . $e->getMessage());
    http_response_code(500);
    respond(false, 'Something went wrong saving your message. Please try again shortly.');
}

// Best-effort email notification — form still succeeds even if mail() fails,
// since the submission is already safely stored in the database.
$subject = 'New enquiry from ' . $name;
$body = "Name: $name\nCompany: $company\nEmail: $email\nLooking to build: $type\n\nMessage:\n$message\n";
$headers = 'From: no-reply@kbsntechnology.co.za' . "\r\n" . 'Reply-To: ' . $email;
@mail(NOTIFY_EMAIL, $subject, $body, $headers);

respond(true, "Thanks, $name — your message has been sent. We'll get back to you shortly.");
