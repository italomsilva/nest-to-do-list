-- Inserir usuários na tabela users
INSERT INTO users (id, name, email, password, phone, createdAt, updatedAt) 
VALUES 
  ('1', 'John Doe', 'john.doe@example.com', 'senha123', '123456789', NOW(), NOW()),
  ('2', 'Jane Smith', 'jane.smith@example.com', 'senha456', NULL, NOW(), NOW()),
  ('3', 'Michael Johnson', 'michael.johnson@example.com', 'senha789', '987654321', NOW(), NOW());
