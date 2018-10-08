# REST API Boilerplate

A basic REST API to create, read, update and delete "To Do" items stored in a MongoDB database

Made with [Feathers](https://feathersjs.com/)

Features:

- [x] CRUD operations
- [x] Search by title
- [x] Testing

## Development steps

Install the dev dependencies used for linting, formatting and testing code:

- Jest
- ESLint
- Prettier

Install the dependencies to run Feathers

```
npm install cors @feathersjs/feathers @feathersjs/express dotenv-safe mongoose feathers-mongoose debug
```

Create a "todos" service that implement the Feathers Mongoose service.
