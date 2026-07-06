# Controle de Gastos Familiar
Uma aplicação Full-Stack desenvolvida para o gerenciamento financeiro de moradores de uma residência. O sistema permite o cadastro de pessoas, lançamento de receitas e despesas, e a visualização de um painel financeiro consolidado com o saldo líquido de cada integrante.

## Tecnologias Utilizadas

#### Backend
- C# e .NET 8
-  Entity Framework Core
- SQLite (Banco de Dados Relacional)
- LINQ para consultas e agregações de dados

#### Frontend

- React
- TypeScript
- CSS puro


## Funcionalidades e Regras de Negócio

- Gestão de Moradores: Criação e remoção de moradores. A deleção de um morador aplica o efeito cascata, removendo todo o seu histórico de transações.

- Validação de Nomes: Proteção no backend que impede o cadastro de moradores com nomes em branco ou apenas com espaços.

- Lançamento de Transações: Registro de movimentações financeiras (Receita ou Despesa) vinculadas a um morador.

- Trava de Valores Inconsistentes: O backend recusa o cadastro de transações com valores negativos ou zerados.

- Regra de Maioridade: Menores de 18 anos são restritos apenas ao lançamento de Despesas.

- Painel de Totais: Cálculo das receitas totais, despesas totais e do saldo líquido de cada morador.


## 💻 Como Executar o Projeto

### Pré-requisitos
* SDK do .NET 8
* Node.js (versão 18 ou superior)

### Rodando o Backend (API C#)
1. Abra o terminal na pasta `backend`.
2. Restaure as dependências e inicie o servidor:
   ```bash
   dotnet run
   
3. a API estará disponível e escutando requisições por padrão em http://localhost:5085


### Rodando o Frontend (React)
1. Abra um novo terminal na pasta `frontend`.
2. Instale as dependências do projeto:
   ```bash
   npm install
3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
4. a URL fornecida no terminal geralmente é http://localhost:5173