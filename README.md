# TodoList and Notes API

This is a REST API for a TodoList and Notes application. The API is built using Node.js, TypeScript, and MongoDB as a database. Zod is used for data validation, Jest for unit testing, and Supertest for integration testing.

## Getting Started

### Prerequisites

Make sure you have Node.js and MongoDB installed on your system.

### Installing

1. Clone this repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file from `.dist.env`:

```
cp .dist.env .env
```

4. Run `npm run start` to start the server

## API Endpoints

### User

- `GET /api/user` - get current user
- `POST /api/user` - create a new user

### Session

- `GET /api/session` - get all sessions
- `POST /api/session` - create a new session
- `DELETE /api/session` - delete current session

### Todolist

- `GET /api/todolist` - get all todolists
- `POST /api/todolist` - create a new todolist
- `GET /api/todolist/:todolistId` - get a todolist by id
- `PUT /api/todolist/:todolistId` - update a todolist by id
- `DELETE /api/todolist/:todolistId` - delete a todolist by id

### Notes

- `GET /api/notes` - get all notes
- `POST /api/notes` - create a new note
- `GET /api/notes/:id` - get a note by id
- `PUT /api/notes/:id` - update a note by id
- `DELETE /api/notes/:id` - delete a note by id

## Testing

To run the unit tests, run `npm run test`.

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation
- [Jest](https://jestjs.io/) - Testing framework
- [Supertest](https://github.com/visionmedia/supertest) - HTTP assertion library

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
