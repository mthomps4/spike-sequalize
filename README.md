# Sequelize

Up and Running Demo with Node, Express, and Sequelize.

## The Stack/Tools

*stack:*

- [express](https://expressjs.com/en/starter/hello-world.html)
- [dotenv](https://www.npmjs.com/package/dotenv)

*tools:*

- [nodemon](https://github.com/remy/nodemon#nodemon)

## Setup

- `yarn`
- `yarn db:create` # Creates Database
- `yarn db:migrate` # Creates Tables
- `yarn db:seeds` # Adds Dummy Dataset

## Database Models and Migrations

- `yarn db:g:model TABLE_NAME --attributes firstName:string,lastName:string`:
  This will create a model with TABLE_NAME and given attributes.
  > Note: attributes are required and NO space between comma.
- `yarn db:g:migration AddEmailToUsers`:
  This will create a migration file with up/down placeholders in [./migrations](./migrations). You'll enter any Postgres updates here, then update the model to reflect.
  > Note: if this is a NEW table -- start with g:model
