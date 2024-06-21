DROP DATABASE IF EXISTS testtodo;

CREATE DATABASE testtodo;

USE testtodo;

-- Tabela users
CREATE TABLE users (
id VARCHAR(255) NOT NULL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
phone VARCHAR(20),
created_at DATETIME,
updated_at DATETIME,
auth_token VARCHAR(255)
);
-- Tabela tasks
CREATE TABLE tasks (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    duration INT,
    type VARCHAR(50) NOT NULL,
    owner_user VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    completed BOOLEAN NOT NULL
);
