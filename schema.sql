-- Run this once in phpMyAdmin (cPanel → phpMyAdmin → your database → SQL tab)
-- after creating the database and user in cPanel's "MySQL Databases" tool.

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(150) NOT NULL,
  company VARCHAR(150) DEFAULT NULL,
  email VARCHAR(190) NOT NULL,
  project_type VARCHAR(100) DEFAULT NULL,
  message TEXT,
  ip_address VARCHAR(45) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
