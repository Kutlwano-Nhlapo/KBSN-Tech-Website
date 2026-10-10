<?php
/**
 * View submitted enquiries at:  yoursite.co.za/admin.php?key=YOUR_ADMIN_KEY
 * (ADMIN_KEY is set in config.php — change it from the default before
 * you rely on this, since anyone with the key can view submissions.)
 *
 * This is intentionally simple: no login system, just a shared secret
 * in the URL. Fine for one or two people checking leads occasionally;
 * if you want real accounts and passwords later, that's a bigger step
 * worth doing once the business has grown into needing it.
 */

require __DIR__ . '/config.php';

if (!isset($_GET['key']) || !hash_equals(ADMIN_KEY, $_GET['key'])) {
    http_response_code(403);
    echo 'Not authorised.';
    exit;
}

try {
    $db = get_db_connection();
    $rows = $db->query('SELECT * FROM contact_submissions ORDER BY created_at DESC')->fetchAll();
} catch (PDOException $e) {
    http_response_code(500);
    echo 'Database error.';
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>KBSN Technology — Enquiries</title>
<style>
  body{font-family:Inter,Arial,sans-serif;background:#0B1F3A;color:#EAF1FF;margin:0;padding:32px;}
  h1{font-size:20px;margin-bottom:24px;}
  table{width:100%;border-collapse:collapse;background:rgba(255,255,255,.04);border-radius:12px;overflow:hidden;}
  th,td{padding:12px 14px;text-align:left;font-size:13.5px;border-bottom:1px solid rgba(255,255,255,.08);vertical-align:top;}
  th{background:rgba(255,255,255,.06);text-transform:uppercase;font-size:11px;letter-spacing:.05em;color:#9db4d9;}
  tr:last-child td{border-bottom:none;}
  .empty{color:#9db4d9;font-size:14px;}
</style>
</head>
<body>
  <h1>Contact form submissions (<?= count($rows) ?>)</h1>
  <?php if (empty($rows)): ?>
    <p class="empty">No submissions yet.</p>
  <?php else: ?>
  <table>
    <tr><th>Date</th><th>Name</th><th>Company</th><th>Email</th><th>Type</th><th>Message</th><th>IP</th></tr>
    <?php foreach ($rows as $r): ?>
    <tr>
      <td><?= htmlspecialchars($r['created_at']) ?></td>
      <td><?= htmlspecialchars($r['full_name']) ?></td>
      <td><?= htmlspecialchars($r['company']) ?></td>
      <td><?= htmlspecialchars($r['email']) ?></td>
      <td><?= htmlspecialchars($r['project_type']) ?></td>
      <td><?= nl2br(htmlspecialchars($r['message'])) ?></td>
      <td><?= htmlspecialchars($r['ip_address']) ?></td>
    </tr>
    <?php endforeach; ?>
  </table>
  <?php endif; ?>
</body>
</html>
