# Movie List Application 

## Visão Geral

Este projeto consiste em uma aplicação para listar filmes, utilizando Angular para o front-end e ASP.NET Core para o back-end. A aplicação se integra com a API do The Movie Database (TMDb) para pesquisar e exibir detalhes sobre filmes.

## Descrição do Projeto

Esta aplicação de Lista de Filmes permite ao usuário:

- **Pesquisar** e **salvar filmes** em uma lista de favoritos.
- **Integrada com a API do The Movie Database (TMDb)**, a aplicação exibe detalhes dos filmes, incluindo a nota (rating).
- A aplicação conta com uma **tela inicial** onde o usuário pode pesquisar filmes por meio de uma barra de pesquisa.
  - Cada resultado é apresentado em um **card** que exibe a imagem do filme.
  - Ao clicar na imagem, o usuário é levado para uma **tela com detalhes** do filme onde o usuário pode adicionar seu filme a sua lista de favoritos.
- **Funcionalidades de Favoritos**:
  - Se o usuário estiver logado, pode adicionar o filme à sua lista de favoritos clicando no ícone de coração.
  - Para gerenciar os favoritos, a aplicação inclui **telas de registro e login**, permitindo que o usuário se registre e faça login para salvar seus filmes favoritos.
- Na **tela de favoritos**, o usuário também pode compartilhar o link de sua lista de filmes favoritos com outras pessoas.

### Motivação

A motivação para este projeto é criar uma aplicação robusta e escalável que permita aos usuários pesquisarem e salvarem seus filmes favoritos de forma fácil e intuitiva, enquanto explora o uso de tecnologias modernas como Angular e .NET Core.

### Tecnologias Utilizadas

- **Back-End:** ASP.NET Core (linguagem de programação C#)
- **Front-End:** Angular
- **Banco de Dados:** SQL Server
  - Os registros de usuários e suas listas de filmes favoritos são persistidos no SQL Server.
  - O Entity Framework Core é utilizado para mapeamento objeto-relacional (ORM) e gerenciamento do banco de dados, facilitando a integração entre a aplicação e o SQL Server.
- **Autenticação:** JWT (JSON Web Tokens)
- **Integração de APIs:** API do The Movie Database (TMDb)

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- .NET 7.0 ou superior
- Node.js (versão 16+ recomendada)
- npm
- Git
- bootstrap 5.3 ou superior

## Estrutura do Projeto

- `MovieListApi/`: Contém a API back-end desenvolvida com ASP.NET Core.
- `MovieListFront/`: Contém a aplicação front-end desenvolvida com Angular.

## Acesso à Aplicação

- **Front-End:** [https://your-project.vercel.app](https://your-project.vercel.app)
- **Back-End:** [https://api.your-project.com](https://api.your-project.com)

O front-end e o back-end estão configurados para funcionar em conjunto. O front-end pode fazer requisições para a API do back-end diretamente.

## Configuração Local

### Configuração do Back-End

1. **Clone o repositório:**

   ```bash
   git clone <https://github.com/Beattrriz/MovieList.git>

2. **Navegue até o diretório do back-end:**

    ```bash
    cd MovieListApi

3. **Restaure as dependências e execute a aplicação:**

    ```bash
    dotnet restore
    dotnet run

A API estará disponível em `https://localhost:5001`, a menos que especificado de outra forma no `launchSettings.json` ou nas configurações do projeto.

4. **Configuração de Variáveis de Ambiente:**

   Certifique-se de configurar as variáveis de ambiente necessárias para a API, como a chave da API do TMDb e outras configurações específicas. Essas variáveis podem ser configuradas em um arquivo `appsettings.json` ou em variáveis de ambiente do sistema.

5.

### Configuração do JWT

Para autenticação, o projeto utiliza JWT. O token JWT é gerado durante o login e é usado para autorizar as requisições subsequentes. O token contém informações de identificação do usuário, como o ID e o e-mail.

#### Exemplo de Configuração de JWT no `appsettings.json`:

```json
"Jwt": {
  "Key": "sua-chave-secreta",
  "Issuer": "sua-emissora",
  "Audience": "seu-publico"
}
```

### Configuração do Front-End

1. **Navegue até o diretório do front-end:**

    ```bash
    cd MovieListFront
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Execute a aplicação:**

    ```bash
    npm start
    ```

   A aplicação Angular estará disponível em `http://localhost:4200` por padrão.
   
4. **Configuração de API:**

No front-end, você pode precisar configurar a URL base da API no arquivo `src/environments/environment.ts` ou `src/service` dependendo do ambiente:

    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'https://localhost:5001/api'
    };
    ```
## Recursos de Imagem

As seguintes imagens foram utilizadas neste projeto:

- **Imagem Default**: A imagem padrão foi obtida de [FavPNG](https://favpng.com/).
- **Ícone Favicon**: O ícone de favicon foi obtido de [Flaticon](https://www.flaticon.com/).

## Contato

Para questões, bugs ou sugestões, entre em contato:

[![Gmail](https://img.shields.io/badge/Gmail-FF0000?style=flat&logo=gmail&logoColor=white)](byalt1228@gmail.com)