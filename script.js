// Selecionando os elementos do HTML
const btnBusca = document.getElementById('btn-busca');
const inputBusca = document.getElementById('input-busca');
const containerFrutas = document.querySelector('.container-frutas');

// Função que busca as frutas no Servidor (Node.js) e atualiza a tela
async function buscarFrutas(nome = '') {
    try {
        // 1. Faz a requisição para a sua API (server.js)
        // Passamos o nome na URL para o servidor filtrar
        const resposta = await fetch(`http://localhost:3000/frutas?nome=${nome}`);
        const dados = await resposta.json();

        // --- O PASSO MAIS IMPORTANTE ---
        // 2. Limpamos a vitrine atual para que as frutas antigas sumam
        containerFrutas.innerHTML = "";

        // 3. Se o servidor não encontrar nada, avisamos o usuário
        if (dados.length === 0) {
            containerFrutas.innerHTML = `
                <p style="grid-column: 1/-1; text-align: center; padding: 50px; font-size: 1.2rem;">
                    Ops! Não encontramos "${nome}". 🍎
                </p>`;
            return;
        }

        // 4. Para cada fruta que o servidor retornou, criamos o HTML dela
        dados.forEach(fruta => {
            const card = `
                <div class="card-fruta">
                    <div class="emoji-fruta">${fruta.emoji}</div>
                    <h3>${fruta.titulo}</h3>
                    <p>${fruta.descricao}</p>
                    <span class="preco">R$ ${fruta.preco.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-comprar">Adicionar</button>
                </div>
            `;
            // Adicionamos o novo card dentro do container
            containerFrutas.innerHTML += card;
        });

    } catch (erro) {
        console.error("Erro ao carregar as frutas:", erro);
        containerFrutas.innerHTML = "<p>Erro ao conectar com o servidor. Verifique se o server.js está rodando!</p>";
    }
}

// Evento: Quando clicar no botão da Lupa
btnBusca.addEventListener('click', () => {
    buscarFrutas(inputBusca.value);
});

// Evento: Quando apertar a tecla "Enter" no campo de busca
inputBusca.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarFrutas(inputBusca.value);
    }
});

// Carregar todas as frutas automaticamente assim que a página abrir
buscarFrutas();