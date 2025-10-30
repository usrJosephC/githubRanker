// ranker.js

const axios = require("./node_modules/axios/index.d.cts");

const GITHUB_API_BASE = "https://api.github.com";
const USER_COUNT = 30; // Número de usuários a serem buscados na primeira requisição

// 1. LER O TOKEN DA VARIÁVEL DE AMBIENTE
// Certifique-se de que a variável de ambiente GITHUB_TOKEN foi definida antes de rodar.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// 2. CONFIGURAÇÃO DOS HEADERS
// Se o token existir, cria o cabeçalho de Autorização.
const config = {
  headers: GITHUB_TOKEN
    ? {
        Authorization: `token ${GITHUB_TOKEN}`,
        // Recomendado para APIs do GitHub
        "X-GitHub-Api-Version": "2022-11-28",
      }
    : {},
};

/**
 * Busca detalhes de um user específico do GitHub.
 * @param {string} username - O nome de usuário do GitHub.
 * @returns {Promise<object | null>} Objeto com detalhes (login, followers) ou null em caso de erro.
 */
async function fetchUserDetails(username) {
  try {
    const url = `${GITHUB_API_BASE}/users/${username}`;

    // REQUISIÇÃO: Passando o objeto 'config' para incluir a autenticação, se houver.
    const response = await axios.get(url, config);

    return {
      username: response.data.login,
      followers: response.data.followers,
    };
  } catch (error) {
    // Tratamento de erros de requisição.
    const status = error.response ? error.response.status : "Sem Status";
    console.error(
      `⚠️ Erro ao buscar detalhes de ${username} (Status: ${status}). Pulando...`
    );
    return null;
  }
}

/**
 * Função principal.
 */
async function runProject() {
  console.log("✨ Iniciando GitHub User Ranker...");

  // Verifica se o token está sendo usado.
  if (!GITHUB_TOKEN) {
    console.warn(
      "\nATENÇÃO: Token GITHUB_TOKEN não configurado. Limite de taxa de 60 requisições/hora será aplicado."
    );
    console.warn(
      "Isso pode causar o erro 403 se o script for executado muitas vezes.\n"
    );
  }

  console.log(`1. Buscando os primeiros ${USER_COUNT} usuários.`);

  let initialUsers = [];
  try {
    const listUrl = `${GITHUB_API_BASE}/users?per_page=${USER_COUNT}`;

    // REQUISIÇÃO: Passando o objeto 'config'.
    const response = await axios.get(listUrl, config);
    initialUsers = response.data;
  } catch (error) {
    const status = error.response ? error.response.status : "Sem Status";
    console.error(
      `❌ Erro fatal ao listar usuários iniciais (Status: ${status}): ${error.message}`
    );
    console.error(
      "Verifique seu limite de taxa ou se o token está correto e com as permissões necessárias (read:user)."
    );
    return;
  }

  if (initialUsers.length === 0) {
    console.log("Nenhum usuário encontrado para processar.");
    return;
  }

  console.log("2. Buscando o número de seguidores (followers) para cada um...");
  const detailedUsersPromises = initialUsers.map((user) =>
    fetchUserDetails(user.login)
  );

  // Usa Promise.all para executar as 30 requisições de detalhes em paralelo.
  let detailedUsers = await Promise.all(detailedUsersPromises);

  detailedUsers = detailedUsers.filter((user) => user !== null);

  console.log(
    "3. Ordenando usuários por número de seguidores (decrescente)..."
  );

  // MÉTODO DE ORDENAÇÃO: Ordena em memória do maior para o menor.
  detailedUsers.sort((a, b) => b.followers - a.followers);

  // 4. Exibir o resultado final.
  console.log("\n=============================================");
  console.log("🏆 RANKING DE USUÁRIOS POR FOLLOWERS (Top 30)");
  console.log("=============================================\n");

  if (detailedUsers.length > 0) {
    detailedUsers.forEach((user, index) => {
      const followersCount = user.followers.toLocaleString("pt-BR");

      console.log(
        `${String(index + 1).padEnd(3)}. ${user.username.padEnd(
          20
        )} - Seguidores: ${followersCount}`
      );
    });
  } else {
    console.log("Não foi possível obter dados de nenhum usuário.");
  }

  console.log("\n=============================================");
}

// Executa a função principal.
runProject();
