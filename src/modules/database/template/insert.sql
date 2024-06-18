-- Inserir usuários na tabela users
INSERT INTO users (id, name, email, password, phone, created_at, updated_at) 
VALUES 
  ('1', 'John Doe', 'john.doe@example.com', 'senha123', '123456789', NOW(), NOW()),
  ('2', 'Jane Smith', 'jane.smith@example.com', 'senha456', NULL, NOW(), NOW()),
  ('3', 'Michael Johnson', 'michael.johnson@example.com', 'senha789', '987654321', NOW(), NOW());

-- Inserir Task
INSERT INTO tasks (id, name, description, duration, type, owner_user, created_at) VALUES
('task_1', 'First Task', 'This is the first task', 120, 'Development', 'user1', CURRENT_TIMESTAMP),
('task_2', 'Second Task', 'This is the second task', 90, 'Testing', 'user2', CURRENT_TIMESTAMP),
('task_3', 'Third Task', 'This is the third task', 45, 'Documentation', 'user3', CURRENT_TIMESTAMP);
