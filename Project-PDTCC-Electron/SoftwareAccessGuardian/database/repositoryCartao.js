//passo 17

//chamamos o arquivo de conexao com o db
const pool = require("./connection.js");

//aqui criamos uma funcao assincrona, onde ela vai ser executada sem parar o programa. Nessa funcao vamos procurar o aluno no db de acordo com o uid do cartao. 
async function getAlunoUID(uid){
  const sql = `
    SELECT aluno.rm, aluno.nome_aluno, aluno.email_aluno, aluno.CPF_aluno, aluno.senha_aluno, aluno.telefone_aluno, aluno.numeroFaltas

    FROM credencial
    INNER JOIN aluno ON credencial.aluno_rm = aluno.rm
    WHERE UPPER(credencial.codigoAcesso) = UPPER(?)
    LIMIT 1
  `;

  //Na linha abaixo, usamos o metodo query do pool, que vai fazer a consulta no db. Dentro do metodo query passamos a variavel sql e o parametro uid, que vai substituir o apelido dentro da nossa constante sql.. O query no fim vai retornar um array. Usamos o await para indicar que queremos esperar o retorno da query antes de prosseguir com o codigo.
  const [rows] = await pool.query(sql, [uid]);
  
  //Aqui usamos uma condicao, se nao achar ninguem com o uid passado, retorna null
  if(rows.length === 0){
    return null;
  }
  //caso contrario, retorna o primeiro elemento do array, que vai ser o aluno encontrado.
  return rows[0];
}
//por fim, exportmos a funcao getAlunoUID para que ela possa ser usada em outros arquivos do projeto.
module.exports = {
  getAlunoUID
}