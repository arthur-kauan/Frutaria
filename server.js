const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Nosso "Banco de Dados" em memória
let frutas = [
    { id: 1, titulo: "Morango", preco: 12.90, emoji: "🍓", descricao: "Bandeja 250g" },
    { id: 2, titulo: "Banana Nanica", preco: 6.50, emoji: "🍌", descricao: "Dúzia selecionada" },
    { id: 3, titulo: "Manga Palmer", preco: 5.00, emoji: "🥭", descricao: "Unidade madura" }
];

// --- ROTA DE BUSCA E LISTAGEM (GET) ---
// No Postman: GET http://localhost:3000/frutas
// Para buscar: GET http://localhost:3000/frutas?nome=banana
app.get('/frutas', (req, res) => {
    const termoBusca = req.query.nome;
    
    if (termoBusca) {
        const filtradas = frutas.filter(f => 
            f.titulo.toLowerCase().includes(termoBusca.toLowerCase())
        );
        return res.json(filtradas);
    }
    
    res.json(frutas);
});

// --- ROTA DE CADASTRO (POST) ---
// No Postman: POST http://localhost:3000/frutas
// Body -> raw -> JSON
app.post('/frutas', (req, res) => {
    const { titulo, preco, emoji, descricao } = req.body;

    // Validação de campos obrigatórios
    if (!titulo || !preco || !emoji) {
        return res.status(400).json({ erro: "Título, preço e emoji são obrigatórios!" });
    }

    const novaFruta = {
        id: frutas.length + 1,
        titulo,
        preco: parseFloat(preco),
        emoji,
        descricao: descricao || "Fruta fresca"
    };

    frutas.push(novaFruta);
    res.status(201).json(novaFruta);
});

// Inicialização
app.listen(port, () => {
    console.log(`🍎 Servidor da Frutaria ON em http://localhost:${port}`);
});