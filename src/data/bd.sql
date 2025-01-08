-- Crear la base de datos (opcional si ya está configurada en MYSQL_DATABASE)
CREATE DATABASE IF NOT EXISTS nest_db;

-- Crear tabla de ejemplo
USE nest_db;
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL UNIQUE,
  activo BOOLEAN DEFAULT TRUE
);

-- Insertar datos de ejemplo
INSERT INTO usuarios (nombre, correo) VALUES ('Juan Perez', 'juan@example.com');
