const pool = require('./connection');

async function verificarEmailGestorSeguranca(email, tipoUser) {
  let sql;

  if (tipoUser === 'gestor') {
    sql = `
            SELECT email_gestor
            FROM gestor
            WHERE email_gestor = ?
            LIMIT 1
        `;
  }
  else if (tipoUser === 'seguranca') {
    sql = `
            SELECT email_seguranca
            FROM seguranca
            WHERE email_seguranca = ?
            LIMIT 1
        `;
  }
  else {
    throw new Error('Tipo de usuário inválido.');
  }

  const [result] = await pool.execute(sql, [email]);

  return result.length > 0;
}

function obterDadosUser(tipoUser) {
  if (tipoUser === 'gestor') {
    return {
      tabela: 'gestor',
      colunaEmail: 'email_gestor',
      colunaSenha: 'senha_gestor',
    }
  }

  if (tipoUser === 'seguranca') {
    return {
      tabela: 'seguranca',
      colunaEmail: 'email_seguranca',
      colunaSenha: 'senha_seguranca',
    }
  }
  throw new Error('Tipo de usuário inválido.');
}

async function salvarCodigoRecuperacao(email, tipoUser, codigo) {
  const usuario = obterDadosUser(tipoUser);

  const sql = `
    UPDATE ${usuario.tabela}
        SET codigo_recuperacao = ?,
            expiracao_codigo = DATE_ADD(NOW(), INTERVAL 10 MINUTE)
        WHERE ${usuario.colunaEmail} = ?
        LIMIT 1
  `;

  const [result] = await pool.execute(sql, [codigo, email]);
  return result.affectedRows > 0;
}

async function validarCodigoRecuperacao(email, tipoUser, codigo) {
  const usuario = obterDadosUser(tipoUser);

  const sql = `
        SELECT ${usuario.colunaEmail}
        FROM ${usuario.tabela}
        WHERE ${usuario.colunaEmail} = ?
          AND codigo_recuperacao = ?
          AND expiracao_codigo > NOW()
        LIMIT 1
    `;

  const [linhas] = await pool.execute(sql, [email, codigo]);

  return linhas.length > 0;
}
async function atualizarSenhaRecuperacao(
  email,
  tipoUser,
  codigo,
  novaSenha
) {
  const usuario = obterDadosUser(tipoUser);

  const sql = `
        UPDATE ${usuario.tabela}
        SET ${usuario.colunaSenha} = ?,
            codigo_recuperacao = NULL,
            expiracao_codigo = NULL
        WHERE ${usuario.colunaEmail} = ?
          AND codigo_recuperacao = ?
          AND expiracao_codigo > NOW()
        LIMIT 1
    `;

  const [result] = await pool.execute(sql, [
    novaSenha,
    email,
    codigo
  ]);

  return result.affectedRows > 0;
}

module.exports = {
    verificarEmailGestorSeguranca,
    salvarCodigoRecuperacao,
    validarCodigoRecuperacao,
    atualizarSenhaRecuperacao
};
