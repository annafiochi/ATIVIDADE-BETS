import { Router } from "express";

const suspeitosRoutes = Router();

// Array com suspeitos pré-cadastrados
let suspeitos = [
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Marcelo Carboni",
    profissao: "Docente",
    envolvimento: "sim",
    nivel: "médio", // Concorrente ao nivel mandato
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Marcelo Carboni",
    profissão: "Docente",
    envolvimento: "sim",
    nivel: "médio", // Concorrente ao nivel mandato
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Thiago Ferreira",
    profissao: "Dev",
    envolvimento: "sim",
    nivel: "Alto", // Concorrente ao nivel mandato
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Victor Dougilo",
    profissao: "estudante",
    envolvimento: "sim",
    nivel: "baixo", // Concorrente ao nivel mandato
  },
];
// Rota para listar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
  return res.status(200).json(suspeitos);
});
// Rota para cadastrar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
  const { nome, profissao, envolvimento, nivel } = req.body;

  // Validação dos campos nome e profissao
  if (!nome || !profissao) {
    return res.status(400).send({
      message: "O nome ou o profissão não foi preenchido, cabeçuda!",
    });
  }
  if (!envolvimento || !nivel) {
    return res.status(400).send({
      message: "O nivel ou o suspeito não foi preenchido, cabeçuda!",
    });
  }

  // Criação de um novo suspeito
  const novoSuspeito = {
    id: Math.floor(Math.random() * 1000000),
    nome,
    profissao,
    envolvimento,
    nivel,
  };

  // Adiciona o novo suspeito ao array de suspeitos
  suspeitos.push(novoSuspeito);

  return res.status(201).json({
    message: "suspeito cadastrado com sucesso!",
    novoSuspeito,
  });
});

// Rota para buscar um suspeito pelo id
suspeitosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeito pelo id no array de suspeitos
  const suspeito = suspeitos.find((suspects) => suspects.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `suspeito com id ${id} não encontrado!` });
  }

  return res.status(200).json(suspeito);
});

// Rota para atualizar um suspeito pelo id
suspeitosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, profissao, envolvimento, nivel} = req.body;

  // Busca um suspeito pelo id no array de suspeitos
  const suspeito = suspeitos.find((suspects) => suspects.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `suspeito com id ${id} não encontrado!` });
  }

  // Validação dos campos nome e profissão
  if (!nome || !profissao) {
    return res.status(400).send({
      message: "O nome ou o profissao não foi preenchido, criança aleatória!",
    });
  }

  suspeito.nome = nome;
  suspeito.profissao = profissao;
  suspeito.envolvimento = envolvimento;
  suspeito.nivel = nivel;

  return res.status(200).json({
    message: "suspeito atualizado com sucesso!",
    suspeito,
  });
});

suspeitosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeito pelo id no array de suspeitos
  const suspeito = suspeitos.find((suspects) => suspects.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `suspeito com id ${id} não encontrado!` });
  }

  // Remove o suspeito do array de suspeitos
  suspeitos = suspeitos.filter((suspeito) => suspeito.id != id);

  return res.status(200).json({
    message: "suspeito removido com sucesso!",
    suspeito,
  });
});

export default suspeitosRoutes;