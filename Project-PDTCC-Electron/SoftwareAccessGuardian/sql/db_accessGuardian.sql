CREATE DATABASE db_accessguardian CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


USE db_accessguardian;


CREATE TABLE credencial(
  idCredencial INT,
  codigoAcesso VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  aluno_rm INT NOT NULL,
  FOREIGN KEY (aluno_rm)
    REFERENCES aluno(rm)
);

CREATE TABLE registroAcesso(
  idRegistroAcesso INT,
  dataRegistro DATE NOT NULL,
  horaEntrada DATETIME NOT NULL,
  horaSaida DATETIME NOT NULL,
  peranenciaEscola BOOLEAN NOT NULL,
  motivoSaida VARCHAR(100) NOT NULL,
  aluno_rm int NOT NULL,
  FOREIGN KEY(aluno_rm)
    REFERENCES aluno(rm)
);

CREATE TABLE aluno(
  rm INT(4) PRIMARY KEY NOT NULL,
  nome_aluno varchar(200) NOT NULL,
  email_aluno varchar(200) NOT NULL,
  CPF_aluno INT(11) NOT NULL,
  senha_aluno varchar(50) NOT null,
  telefone_aluno varchar(11),
  numeroFaltas INT NOT NULL
);


CREATE TABLE turma_curso(
  idTurma_curso INT PRIMARY KEY NOT NULL,
  nomeTurma_curso VARCHAR(50) NOT NULL,
  horarioEntrada DATETIME NOT NULL,
  horarioSaida DATETIME
);

  CREATE TABLE gestor(
    nome_gestor varchar(200) NOT NULL,
    email_gestor varchar(200) NOT NULL,
    CPF_gestor INT(11) NOT NULL,
    senha_gestor varchar(50) NOT null,
    telefone_gestor varchar(11)
  );

  CREATE TABLE seguranca(
    nome_seguranca varchar(200) NOT NULL,
    email_seguranca varchar(200) NOT NULL,
    CPF_seguranca INT(11) NOT NULL,
    senha_seguranca varchar(50) NOT null,
    telefone_seguranca varchar(11)
  );
