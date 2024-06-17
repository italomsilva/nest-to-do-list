DROP DATABASE IF EXISTS testtodo;

-- Criar o banco de dados novamente
CREATE DATABASE testtodo;

-- Usar o banco de dados recém-criado
USE testtodo;

-- Criar a tabela users
CREATE TABLE users (
id VARCHAR(255) NOT NULL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
phone VARCHAR(20),
createdAt DATETIME,
updatedAt DATETIME
);