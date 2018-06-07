# Agenda de Clientes - API


__API Hospedada atualmente no Heroku__: https://api-agenda-clientes.herokuapp.com/

E Possui as seguintes rotas:

- Método GET (retorna uma lista de clientes)
`https://api-agenda-clientes.herokuapp.com/clientes`

- Método GET (retorna um unico cliente por ID)
`https://api-agenda-clientes.herokuapp.com/clientes/{id}`

- Método POST (insere um novo cliente)
`https://api-agenda-clientes.herokuapp.com/clientes`
Ex JSON de envio: 
{
    "nome" : "João",
    "telefone": "(14) 99999-8888",
    "email" : "joao@example.com",
    "cor" : #FFFF
}

- Método PUT (update cliente)
`https://api-agenda-clientes.herokuapp.com/clientes/{id}`
Ex JSON de envio: 
{
    "nome" : "João Atualizado",
    "telefone": "(14) 99999-8888",
    "email" : "joao@example.com",
    "cor" : #FFFF
}

- Método DELETE (delete cliente)
`https://api-agenda-clientes.herokuapp.com/clientes/{id}`


# Subir server Localmente (caso necessário)

- clonar repositório: `git clone https://github.com/joaopedro1206/api-agenda.git`
- Navegue até a pasta: `cd api-agenda`
- Instale as dependencias: `npm install`
- Startar o server: `node index.js`