# Biblioteca POO em Node.js

Este projeto oferece um exemplo didático de **programação orientada a objetos (POO)** para uma API simples de biblioteca utilizando **Node.js** e **Express**. Ele foi pensado como material de apoio para aulas de backend e inclui páginas HTML que consomem a API via **jQuery + AJAX**.

## Conceitos de POO aplicados aqui
- **Classes e objetos**: cada entidade da base (Autor, Livro, Usuário, etc.) é representada por uma classe em `src/models`. Os objetos criados a partir dessas classes carregam os dados do domínio.
- **Herança**: todas as classes de domínio herdam de `BaseModel`, que centraliza comportamentos comuns como o campo `id` e o método `updateFrom`.
- **Encapsulamento**: o acesso às coleções de dados é mediado por repositórios (`InMemoryRepository`), evitando manipular os arrays diretamente.
- **Responsabilidade única**: controladores cuidam apenas da lógica HTTP, enquanto repositórios gerenciam dados e modelos representam o domínio.

## Estrutura de pastas
```
src/
  controllers/   -> classes que tratam as requisições HTTP
  database/      -> conexão com MySQL e repositórios
  models/        -> classes que representam as tabelas do diagrama
  repositories/  -> repositórios para CRUD (MySQL)
  routes/        -> mapeamento das rotas Express
  server.js      -> inicialização do servidor
public/           -> páginas HTML simples que chamam a API via AJAX
```

## Como executar
1. Configure as variáveis de ambiente para apontar para o MySQL existente (conforme diagrama):
   ```bash
   export DB_HOST=localhost
   export DB_PORT=3306
   export DB_USER=root
   export DB_PASSWORD=""
   export DB_NAME=biblioteca
   ```
2. Instale as dependências (é necessário acesso à internet para baixar Express, cors e mysql2):
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. Abra `http://localhost:3000` no navegador para usar as páginas HTML. Agora há telas para livros, autores, categorias, usuários, empréstimos e vínculo livro x autor.

## Rotas principais
- `GET /api/livros` – lista livros
- `POST /api/livros` – cria livro
- `GET /api/autores` – lista autores
- `POST /api/autores` – cria autor
- `GET /api/emprestimos` – lista empréstimos
- `POST /api/emprestimos` – cria empréstimo e marca exemplar como emprestado
- `POST /api/emprestimos/:id/devolver` – marca devolução e libera o exemplar
- `GET /api/livros-autores` – lista associações entre livros e autores
- `POST /api/livros-autores` – cria uma nova associação
- `DELETE /api/livros-autores` – remove uma associação informando `idLivro` e `idAutor`

Rotas de `PUT` e `DELETE` também estão disponíveis para as coleções padrão.

## Explicando em sala
- Mostre como `MemoryDatabase` instancia repositórios e pré-carrega dados simulando tabelas.
- Siga o fluxo **rota → controlador → repositório → modelo** para ilustrar separação de responsabilidades.
- Utilize as páginas HTML para testar chamadas AJAX e observar o retorno JSON da API.
- Brinque com novos campos ou validações para reforçar como a herança ajuda a reaproveitar código.
