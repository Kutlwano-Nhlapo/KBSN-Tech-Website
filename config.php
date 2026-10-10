<?php
/**
 * Fill these in with the values from your Afrihost cPanel.
 *
 * cPanel → MySQL Databases:
 *   - Create a database, e.g. "contacts" → cPanel will name it
 *     something like  yourcpaneluser_contacts
 *   - Create a database user and password, then add that user to the
 *     database with "All Privileges".
 *
 * DB_HOST is almost always "localhost" on Afrihost shared hosting.
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'kbsnteo7a9n4_UsersContacts');
define('DB_USER', 'kbsnteo7a9n4_KutlwanoNhlapo');
define('DB_PASS', 'Kutlwano@01');

// Where new-lead notification emails should be sent (your own inbox)
define('NOTIFY_EMAIL', 'kutlwanonhlapo@kbsntech.co.za');

// Your Gemini API key (free tier — get one at aistudio.google.com/apikey),
// used by chat-handler.php. This file is never served to the browser —
// it's only ever `require`-d by other PHP files — so the key stays
// server-side. Format looks like "AIza...".
define('GEMINI_API_KEY', 'AQ.Ab8RN6IWBpOs3aVaDL6AZfaUJzBMb0L6R2moVt_bIMnjbe2Djw');

// A private key of your choosing — used to view submissions at
// admin.php?key=THIS_VALUE. Change it to something long and random.
define('ADMIN_KEY', 'change-this-to-something-long-and-secret');

function get_db_connection() {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    return new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}
