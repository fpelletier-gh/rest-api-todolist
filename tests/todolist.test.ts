import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../src/utils/server";
import mongoose from "mongoose";
import { signJwt } from "../src/utils/jwt.utils";
import {
  createTodolist,
  findAndCreateTodo,
} from "../src/service/todolist.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const todolistPayload = {
  user: userId,
  title: "Groceries",
  description: "A list about groceries.",
  todos: [],
  valid: true,
};

export const todolistUpdatePayload = {
  user: userId,
  title: "Updated Groceries",
  description: "An updated list about groceries.",
  todos: [],
  valid: true,
};

export const todoPayload = {
  title: "Buy milk",
};

export const updatedTodoPayload = {
  complete: true,
};

export const secondTodoPayload = {
  title: "Buy meat",
};

export const updatedSecondTodoPayload = {
  title: "Buy more meat",
  complete: true,
};

export const userPayload = {
  _id: userId,
  email: "test@example.com",
  name: "John Smith",
};

describe("todolist", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  beforeEach(async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("GET todolist route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const invalidId = "1";

        const { statusCode } = await supertest(app).get(
          `/api/todolist/${invalidId}`
        );
        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in and the todolist does not exist", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const invalidid = "1";

        const { statusCode } = await supertest(app)
          .get(`/api/todolist/${invalidid}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the user is logged in and the todolist does exist", () => {
      it("should return a 200 status and the todolist", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);

        const todolistId = todolist.todolistId;

        const { statusCode, body } = await supertest(app)
          .get(`/api/todolist/${todolistId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body.todolistId).toBe(todolistId);
      });
    });
  });

  describe("POST create todolist route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/todolist")
          .send(todolistPayload);

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      it("should return a 200 and create the todolist", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/todolist")
          .set("Authorization", `Bearer ${jwt}`)
          .send(todolistPayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          todolistId: expect.any(String),
          title: "Groceries",
          description: "A list about groceries.",
          todos: expect.any(Array),
          /* todos: [ */
          /*   { */
          /*     title: "Buy milk", */
          /*     complete: false, */
          /*     createdAt: expect.any(String), */
          /*     updatedAt: expect.any(String), */
          /*   }, */
          /* ], */
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
        });
      });
    });
  });

  describe("DELETE todolist route", () => {
    describe("given the user is not logged in and the todolist does not exist", () => {
      it("should return a 403", async () => {
        const invalidId = "1";

        const { statusCode } = await supertest(app).get(
          `/api/todolist/${invalidId}`
        );
        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is not logged in and the todolist exist", () => {
      it("should return a 403", async () => {
        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);

        const todolistId = todolist.todolistId;

        const { statusCode } = await supertest(app).delete(
          `/api/todolist/${todolistId}`
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in and the todolist does not exist", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const invalidid = "1";

        const { statusCode } = await supertest(app)
          .delete(`/api/todolist/${invalidid}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the user is logged in and the todolist does exist", () => {
      it("should return a 200 status", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);

        const todolistId = todolist.todolistId;

        const { statusCode } = await supertest(app)
          .delete(`/api/todolist/${todolistId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
      });
    });
  });

  describe("PUT update todolist route", () => {
    describe("given the user is not logged in and the todolist does not exist", () => {
      it("should return a 403", async () => {
        const invalidId = "1";

        const { statusCode } = await supertest(app).put(
          `/api/todolist/${invalidId}`
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is not logged in and the todolist exist", () => {
      it("should return a 403", async () => {
        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);

        const todolistId = todolist.todolistId;

        const { statusCode } = await supertest(app)
          .put(`/api/todolist/${todolistId}`)
          .send(todolistUpdatePayload);

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in and the todolist does not exist", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const invalidid = "1";

        const { statusCode } = await supertest(app)
          .put(`/api/todolist/${invalidid}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(todolistUpdatePayload);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the user is logged in and the todolist does exist", () => {
      it("should return a 200 status and the updated todolist", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);

        const todolistId = todolist.todolistId;

        const { statusCode, body } = await supertest(app)
          .put(`/api/todolist/${todolistId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(todolistUpdatePayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          todolistId: expect.any(String),
          title: "Updated Groceries",
          description: "An updated list about groceries.",
          todos: expect.any(Array),
          /* todos: [ */
          /*   { */
          /*     title: "Buy milk", */
          /*     complete: false, */
          /*     createdAt: expect.any(String), */
          /*     updatedAt: expect.any(String), */
          /*   }, */
          /* ], */
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
        });
      });
    });
  });

  describe("POST create a todo", () => {
    describe("given the user is not logged in and the todolist does not exist", () => {
      it("should return a 403", async () => {
        const invalidId = "1";

        const { statusCode } = await supertest(app)
          .post(`/api/todolist/${invalidId}`)
          .send(todoPayload);

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is not logged in and the todolist exist", () => {
      it("should return a 403", async () => {
        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);

        const todolistId = todolist.todolistId;

        const { statusCode } = await supertest(app)
          .post(`/api/todolist/${todolistId}`)
          .send(todoPayload);

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in and the todolist does not exist", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const invalidid = "1";

        const { statusCode } = await supertest(app)
          .post(`/api/todolist/${invalidid}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(todoPayload);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the user is logged in and the todolist does exist", () => {
      it("should return a 200 status and the updated todolist", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);

        const todolistId = todolist.todolistId;

        const { statusCode, body } = await supertest(app)
          .post(`/api/todolist/${todolistId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(todoPayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          todolistId: expect.any(String),
          title: "Groceries",
          description: "A list about groceries.",
          todos: [
            {
              _id: expect.any(String),
              todoId: expect.any(String),
              title: "Buy milk",
              complete: false,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          ],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
        });
      });
    });

    describe("given the user is logged in and the todolist does exist with a todo", () => {
      it("should be able to add a second todo", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);
        await findAndCreateTodo(todolist, todoPayload, { new: true });

        const todolistId = todolist.todolistId;

        const { statusCode, body } = await supertest(app)
          .post(`/api/todolist/${todolistId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(secondTodoPayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          todolistId: expect.any(String),
          title: "Groceries",
          description: "A list about groceries.",
          todos: [
            {
              _id: expect.any(String),
              todoId: expect.any(String),
              title: "Buy milk",
              complete: false,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
            {
              _id: expect.any(String),
              todoId: expect.any(String),
              title: "Buy meat",
              complete: false,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          ],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
        });
      });
    });
  });

  describe("DELETE a todo", () => {
    describe("given the user is not logged in and the todolist does not exist", () => {
      it("should return a 403", async () => {
        const invalidId = "1";
        const invalidTodoId = "1";

        const { statusCode } = await supertest(app).delete(
          `/api/todolist/${invalidId}/${invalidTodoId}`
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is not logged in and the todolist and todo exist", () => {
      it("should return a 403", async () => {
        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);
        const todolistId = todolist.todolistId;

        const todolistWithTodo = await findAndCreateTodo(
          { todolistId: todolistId },
          todoPayload,
          { new: true }
        );

        const todoId = todolistWithTodo?.todos[0].todoId;

        const { statusCode } = await supertest(app).delete(
          `/api/todolist/${todolistId}/${todoId}`
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in, the todolist exist and the todo doesn't exist", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const todolist = await createTodolist(todolistPayload);
        const todolistId = todolist.todolistId;
        const invalidTodoId = "1";

        const { statusCode } = await supertest(app)
          .delete(`/api/todolist/${todolistId}/${invalidTodoId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the user is logged in, the todolist and todo exist", () => {
      it("should return a 200 status and the updated todolist", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);
        const todolistId = todolist.todolistId;

        const todolistWithTodo = await findAndCreateTodo(
          { todolistId: todolistId },
          todoPayload,
          { new: true }
        );

        const todoId = todolistWithTodo?.todos[0].todoId;

        const { statusCode, body } = await supertest(app)
          .delete(`/api/todolist/${todolistId}/${todoId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          todolistId: expect.any(String),
          title: "Groceries",
          description: "A list about groceries.",
          todos: [],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
        });
      });
    });

    describe("given the user is logged in and the todolist does exist with more than one todo", () => {
      it("should be able to delete the second todo", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);
        const todolistId = todolist.todolistId;

        await findAndCreateTodo({ todolistId: todolistId }, todoPayload, {
          new: true,
        });

        const todolistWithTwoTodos = await findAndCreateTodo(
          { todolistId: todolistId },
          secondTodoPayload,
          { new: true }
        );

        const secondTodoId = todolistWithTwoTodos?.todos[1].todoId;

        const { statusCode, body } = await supertest(app)
          .delete(`/api/todolist/${todolistId}/${secondTodoId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          todolistId: expect.any(String),
          title: "Groceries",
          description: "A list about groceries.",
          todos: [
            {
              _id: expect.any(String),
              todoId: expect.any(String),
              title: "Buy milk",
              complete: false,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          ],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
        });
      });
    });
  });

  describe("PUT update a todo", () => {
    describe("given the user is not logged in and the todolist does not exist", () => {
      it("should return a 403", async () => {
        const invalidId = "1";
        const invalidTodoId = "1";

        const { statusCode } = await supertest(app)
          .put(`/api/todolist/${invalidId}/${invalidTodoId}`)
          .send(updatedTodoPayload);

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is not logged in and the todolist and todo exist", () => {
      it("should return a 403", async () => {
        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);
        const todolistId = todolist.todolistId;

        const todolistWithTodo = await findAndCreateTodo(
          { todolistId: todolistId },
          todoPayload,
          { new: true }
        );

        const todoId = todolistWithTodo?.todos[0].todoId;

        const { statusCode } = await supertest(app)
          .put(`/api/todolist/${todolistId}/${todoId}`)
          .send(updatedTodoPayload);

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in, the todolist exist and the todo doesn't exist", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const todolist = await createTodolist(todolistPayload);
        const todolistId = todolist.todolistId;
        const invalidTodoId = "1";

        const { statusCode } = await supertest(app)
          .put(`/api/todolist/${todolistId}/${invalidTodoId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(updatedTodoPayload);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the user is logged in, the todolist and todo exist", () => {
      it("should return a 200 status and the updated todolist", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);
        const todolistId = todolist.todolistId;

        const todolistWithTodo = await findAndCreateTodo(
          { todolistId: todolistId },
          todoPayload,
          { new: true }
        );

        const todoId = todolistWithTodo?.todos[0].todoId;

        const { statusCode, body } = await supertest(app)
          .put(`/api/todolist/${todolistId}/${todoId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(updatedTodoPayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          todolistId: expect.any(String),
          title: "Groceries",
          description: "A list about groceries.",
          todos: [
            {
              title: "Buy milk",
              complete: true,
              _id: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              todoId: expect.any(String),
            },
          ],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
        });
      });
    });

    describe("given the user is logged in and the todolist does exist with more than one todo", () => {
      it("should be able to update the second todo complete and title field", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const todolist = await createTodolist(todolistPayload);
        const todolistId = todolist.todolistId;

        await findAndCreateTodo({ todolistId: todolistId }, todoPayload, {
          new: true,
        });

        const todolistWithTwoTodos = await findAndCreateTodo(
          { todolistId: todolistId },
          secondTodoPayload,
          { new: true }
        );

        const secondTodoId = todolistWithTwoTodos?.todos[1].todoId;

        const { statusCode, body } = await supertest(app)
          .put(`/api/todolist/${todolistId}/${secondTodoId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(updatedSecondTodoPayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          todolistId: expect.any(String),
          title: "Groceries",
          description: "A list about groceries.",
          todos: [
            {
              _id: expect.any(String),
              todoId: expect.any(String),
              title: "Buy milk",
              complete: false,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
            {
              title: "Buy more meat",
              complete: true,
              _id: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              todoId: expect.any(String),
            },
          ],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
        });
      });
    });
  });
});
