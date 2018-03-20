### CRUD ANGULARJS

Desenvolvedor: Rafael Lemes

### Visão geral
O Sistema foi baseado em Node.js onde foi utilizado a ferramenta “Express” para servir e 
gerenciar as rotas. Sendo o core (back-end) disponibilizado via 
WebService REST e o front-end (páginas HTML) no padrão SPA (Single Page Application) 
usando o Angular 1.5 como framework para desenvolvimento e o Bootstrap 3.3.6 para manter o mesmo Responsivo.

### Banco de Dados
O banco de dados utilizado é o MySQL CS 5.7.17 

### Arquitetura
 O Projeto é separado em duas partes, de modo a separar as regras de negócios da interface com o usuário, 
 podendo então, haver diversos clients (Mobile, Desktop) utilizando o mesmo Core e 
 minimizando os riscos de que haja diferenças entre os mesmos. Portanto: 
 
##### api-rest

O Core, responsável por centralizar todas as regras de negócios, 
disponibilizando o acesso via WebService utilizando o padrão REST

##### client-html
Responsável pela interface com o usuário, onde ficará todo o código HTML.

### Iniciando o Projeto

#### Banco de dados
Após fazer o download do projeto e descompacta-lo, será necessário primeiramente fazer o dump do banco de dados, o arquivo será encontrado na pasta scripts na raiz do projeto e terá o nome dump.sql

#### api-rest
Na pasta api-rest se for o primeiro acesso, abra o prompt de comando e utilize o compando: 
npm update
após o node atualizar e fazer o download de todas as dependências para iniciar o servidor, 
no mesmo prompt de comando execute o comando:
npm start
A aplicação ficará disponível sobre a porta 3000, podendo acessá-la localmente através da url:
http://localhost:3000/

Obs: na raiz do projeto haverá o arquivo: reembolso.postman_collection.json onde será possível 
encontrar todos os endpoints disponíveis para teste e desenvolvimento.
Basta fazer o download o Client Rest Postman 

#### cliente-html
Execute o mesmo procedimento do api-rest. 
A aplicação ficará disponível sobre a porta 4000, podendo acessá-la através da url:
http://localhost:4000/login.html

###### usuario | senha
rafa.lemes - 123


