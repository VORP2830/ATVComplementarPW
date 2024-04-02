# Atividade Complementar Programação Web

Este é o repositório para a atividade complementar de programação web. O projeto requer a instalação do Angular 15 e do SDK do .NET 8.0 na máquina para ser executado.

## Instruções para Execução

### Frontend

1. Navegue até a pasta do frontend usando o comando:

   ```bash
   cd Front
   ```

2. Instale as dependências utilizando o seguinte comando:

   ```bash
   npm install
   ```

3. Por fim, para iniciar o servidor, execute:

   ```bash
   npm start
   ```

### Backend

1. Para executar o backend do projeto, navegue até a pasta do backend usando o comando:

   ```bash
   cd Back
   ```

2. Instale as dependências utilizando o seguinte comando:

   ```bash
   dotnet restore
   ```

3. Em seguida, acesse a pasta `ATVComplementarPW.API` com o comando:

   ```bash
   cd ATVComplementarPW.API
   ```

4. Por fim, execute o seguinte comando para iniciar o servidor:

   ```bash
   dotnet watch run
   ```

Certifique-se de seguir estas etapas cuidadosamente para garantir a correta execução do projeto.

### Docker Compose

Se deseja uma opção mais simples, você pode utilizar o Docker Compose para configurar e executar o projeto de forma mais rápida e conveniente. Aqui está como fazer isso:

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

2. Na raiz do projeto, existe um arquivo chamado `docker-compose.yml`

3. Execute o seguinte comando para construir e iniciar os contêineres:

   ```bash
   docker-compose up --build
   ```

5. Após a construção e inicialização bem-sucedidas, você poderá acessar o frontend em `http://localhost:4200` e o backend em `http://localhost:5204`.

Utilizando o Docker Compose, você pode simplificar o processo de configuração e execução do projeto.