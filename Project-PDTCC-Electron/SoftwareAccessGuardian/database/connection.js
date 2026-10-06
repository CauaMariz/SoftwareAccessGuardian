const mysql = require('mysql2/promise');
require('dotenv').config();

//o pool permite fazermos diversas conexões com o banco de dados, sem precisar ficar abrindo e fechando a conexão toda hora.
const pool = mysql.createPool({

  //o process é uma variavel global do nodejs, que permite acessar variaveis de ambiente do sistema operacional.
  //aqui indicamos pro process.env o nome do nosso host, usuario, senha e nome do banco de dados que queremos acessar.
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,

  //como nossa porta esta em string, temos que converter para int
  port: parseInt(process.env.db_port),

  //a opcao waitForConnections indica se o pool deve ou nao esperar por cada conexao, no nosso caso sim.
  waitForConnections: true,

  //aqui definimos o limite de conexoes que o pool pode ter, no nosso caso 10.
  connectionLimit: 10,

  //aqui definimos o limite de conexoes que podem ficar na fila, no nosso caso 0.
  queueLimit: 0
});

//aqui exportaos o pool para todo o projeto
module.exports = pool;

//teste se o nome do usuario do banco de dados esta sendo lido corretamente.
console.log(process.env.db_user); 
