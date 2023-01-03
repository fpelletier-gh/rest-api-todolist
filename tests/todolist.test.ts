import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../src/utils/server";
import mongoose from "mongoose";
import { signJwt } from "../src/utils/jwt.utils";
import { createTodolist } from "../src/service/todolist.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const todolistPayload = {
  user: userId,
  title: "Groceries",
  description: "A list about groceries.",
  valid: true,
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
          __v: 0,
          _id: expect.any(String),
          user: expect.any(String),
          todolistId: expect.any(String),
          title: "Groceries",
          description: "A list about groceries.",
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
});
