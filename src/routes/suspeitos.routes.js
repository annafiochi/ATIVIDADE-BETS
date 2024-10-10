import { Router } from "express";

const suspeitosRoutes = Router();

// Array com candidatos pré-cadastrados
let suspeitos = [
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Marcelo Carboni",
    profissão: "Docente",
    envolvimento: "sim",
    nivel: "médio", // Concorrente ao segundo mandato
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Marcelo Carboni",
    profissão: "Docente",
    envolvimento: "sim",
    nivel: "médio", // Concorrente ao segundo mandato
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Thiago Ferreira",
    profissão: "Dev",
    envolvimento: "sim",
    nivel: "Alto", // Concorrente ao segundo mandato
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Victor Dougilo",
    profissão: "estudante",
    envolvimento: "sim",
    nivel: "baixo", // Concorrente ao segundo mandato
  },
];




// Rota para listar todos os candidatos
suspeitosRoutes.get("/", (req, res) => {
  return res.status(200).json(suspeitos);
});

// Rota para cadastrar um novo candidato
candidatosRoutes.post("/", (req, res) => {
  const { nome, partido, idade, segundo, propostas } = req.body;

  // Validação dos campos nome e partido
  if (!nome || !partido) {
    return res.status(400).send({
      message: "O nome ou o partido não foi preenchido, criança aleatória!",
    });
  }

  // Validação de idade
  if (idade < 18) {
    return res.status(400).send({
      message:
        "O candidato não possui idade suficiente para participar deste debate!",
    });
  }

  // Criação de um novo candidato
  const novoCandidato = {
    id: Math.floor(Math.random() * 1000000),
    nome,
    partido,
    idade,
    segundo,
    propostas,
  };

  // Adiciona o novo candidato ao array de candidatos
  candidatos.push(novoCandidato);

  return res.status(201).json({
    message: "Candidato cadastrado com sucesso!",
    novoCandidato,
  });
});

// Rota para buscar um candidato pelo id
candidatosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um candidato pelo id no array de candidatos
  const candidato = candidatos.find((politico) => politico.id == id);

  // Verifica se o candidato foi encontrado
  if (!candidato) {
    return res
      .status(404)
      .json({ message: `Candidato com id ${id} não encontrado!` });
  }

  return res.status(200).json(candidato);
});

// Rota para atualizar um candidato pelo id
candidatosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, partido, idade, segundo, propostas } = req.body;

  // Busca um candidato pelo id no array de candidatos
  const candidato = candidatos.find((politico) => politico.id == id);

  // Verifica se o candidato foi encontrado
  if (!candidato) {
    return res
      .status(404)
      .json({ message: `Candidato com id ${id} não encontrado!` });
  }

  // Validação dos campos nome e partido
  if (!nome || !partido) {
    return res.status(400).send({
      message: "O nome ou o partido não foi preenchido, criança aleatória!",
    });
  }

  candidato.nome = nome;
  candidato.partido = partido;
  candidato.idade = idade;
  candidato.segundo = segundo;
  candidato.propostas = propostas;

  return res.status(200).json({
    message: "Candidato atualizado com sucesso!",
    candidato,
  });
});

candidatosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um candidato pelo id no array de candidatos
  const candidato = candidatos.find((politico) => politico.id == id);

  // Verifica se o candidato foi encontrado
  if (!candidato) {
    return res
      .status(404)
      .json({ message: `Candidato com id ${id} não encontrado!` });
  }

  // Remove o candidato do array de candidatos
  candidatos = candidatos.filter((candidato) => candidato.id != id);

  return res.status(200).json({
    message: "Candidato removido com sucesso!",
    candidato,
  });
});

export default candidatosRoutes;