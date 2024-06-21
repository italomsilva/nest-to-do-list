-- Inserir usuários na tabela users
INSERT INTO users (id, name, email, password, phone, created_at, updated_at, auth_token) 
VALUES 
  ('1', 'Lilith Langley', 'asuka.red02@example.com', 'unidade2', '123456789', NOW(), NOW(), NULL),
  ('2', 'adão Ikari', 'shinji.pruple01@example.com', 'unidade1', '987654321', NOW(), NOW(), NULL),
  ('3', 'Eva Ayanami', 'rey.blue00@example.com', 'unidade0', NULL, NOW(), NOW(), NULL);

-- Inserir Task
INSERT INTO tasks (id, title, description, duration, type, owner_user, created_at, completed) VALUES
('task_1', 'First Task', 'This is the first task', 120, 'Development', '1', CURRENT_TIMESTAMP, FALSE),
('task_2', 'Second Task', 'This is the second task', 90, 'Testing', '2', CURRENT_TIMESTAMP, FALSE),
('task_3', 'Third Task', 'This is the third task', 45, 'Documentation', '3', CURRENT_TIMESTAMP, FALSE);
