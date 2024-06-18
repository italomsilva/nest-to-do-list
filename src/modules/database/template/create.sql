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
updated_at DATETIME
);
-- Tabela tasks
CREATE TABLE tasks (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    owner_user VARCHAR(255),
    created_at TIMESTAMP
);
