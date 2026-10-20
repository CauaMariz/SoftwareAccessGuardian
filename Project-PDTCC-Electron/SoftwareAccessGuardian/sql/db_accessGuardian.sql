
CREATE DATABASE IF NOT EXISTS db_accessguardian
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE db_accessguardian;


-- 1. ALUNO
CREATE TABLE aluno (
    rm INT PRIMARY KEY,
    nome_aluno VARCHAR(200) NOT NULL,
    email_aluno VARCHAR(200) NOT NULL UNIQUE,
    CPF_aluno CHAR(11) NOT NULL UNIQUE,
    senha_aluno VARCHAR(255) NOT NULL,
    telefone_aluno VARCHAR(11),
    numeroFaltas INT NOT NULL DEFAULT 0,

    codigoRecuperacao VARCHAR(10),
    expiracaoCodigoRecuperacao DATETIME
);


-- 2. GESTOR
CREATE TABLE gestor (
    idGestor INT AUTO_INCREMENT PRIMARY KEY,
    nome_gestor VARCHAR(200) NOT NULL,
    email_gestor VARCHAR(200) NOT NULL UNIQUE,
    CPF_gestor CHAR(11) NOT NULL UNIQUE,
    senha_gestor VARCHAR(255) NOT NULL,
    telefone_gestor VARCHAR(11),

    codigoRecuperacao VARCHAR(10),
    expiracaoCodigoRecuperacao DATETIME
);


-- 3. SEGURANÇA
CREATE TABLE seguranca (
    idSeguranca INT AUTO_INCREMENT PRIMARY KEY,
    nome_seguranca VARCHAR(200) NOT NULL,
    email_seguranca VARCHAR(200) NOT NULL UNIQUE,
    CPF_seguranca CHAR(11) NOT NULL UNIQUE,
    senha_seguranca VARCHAR(255) NOT NULL,
    telefone_seguranca VARCHAR(11),

    codigoRecuperacao VARCHAR(10),
    expiracaoCodigoRecuperacao DATETIME
);


-- 4. TURMA / CURSO
CREATE TABLE turma_curso (
    idTurma_curso INT AUTO_INCREMENT PRIMARY KEY,
    nomeTurma_curso VARCHAR(50) NOT NULL,
    horarioEntrada TIME NOT NULL,
    horarioSaida TIME
);


-- 5. CREDENCIAL
CREATE TABLE credencial (
    idCredencial INT AUTO_INCREMENT PRIMARY KEY,
    codigoAcesso VARCHAR(50) NOT NULL UNIQUE,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    aluno_rm INT NOT NULL,

    FOREIGN KEY (aluno_rm)
        REFERENCES aluno(rm)
);


-- 6. REGISTRO DE ACESSO
CREATE TABLE registroAcesso (
    idRegistroAcesso INT AUTO_INCREMENT PRIMARY KEY,
    dataRegistro DATE NOT NULL,
    horaEntrada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    horaSaida DATETIME,
    permanenciaEscola BOOLEAN NOT NULL DEFAULT TRUE,
    motivoSaida VARCHAR(100),
    aluno_rm INT NOT NULL,

    FOREIGN KEY (aluno_rm)
        REFERENCES aluno(rm)
);
