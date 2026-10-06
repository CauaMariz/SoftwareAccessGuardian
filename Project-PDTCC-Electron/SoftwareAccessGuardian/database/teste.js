const { getAlunoUID } = require('./repositoryCartao');

async function testar() {
    const aluno = await getAlunoUID('AS76DA');

    console.log(aluno);
}

testar();