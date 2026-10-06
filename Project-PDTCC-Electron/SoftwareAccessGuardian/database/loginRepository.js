//chamamos o arquivo de conexao com o db
const pool = require("./connection.js");

//aqui criamos uma funcao assincrona, onde ela vai ser executada sem parar o programa. Nessa funcao vamos procurar o gestor no db de acordo com o email e senha. 
async function loginUser(email, senha){
  const sql = `
    SELECT email_seguranca, nome_seguranca

    FROM seguranca
    WHERE email_seguranca = ? AND senha_seguranca = ?
    LIMIT 1
  `;

  //Na linha abaixo, usamos o metodo query do pool, que vai fazer a consulta no db. Dentro do metodo query passamos a variavel sql e o parametro uid, que vai substituir o apelido dentro da nossa constante sql.. O query no fim vai retornar um array. Usamos o await para indicar que queremos esperar o retorno da query antes de prosseguir com o codigo.
  const [rows] = await pool.query(sql, [email, senha]);
  
  //Aqui usamos uma condicao, se nao achar ninguem com o email e senha fornecidos, retorna null
  if(rows.length === 0){
    return null;
  }
  //caso contrario, retorna o primeiro elemento do array, que vai ser o gestor encontrado.
  return rows[0];
}
//por fim, exportmos a funcao loginGestao para que ela possa ser usada em outros arquivos do projeto.
module.exports = {
  loginUser
}