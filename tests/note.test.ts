import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../src/utils/server";
import mongoose from "mongoose";
import { signJwt } from "../src/utils/jwt.utils";
import { createNote, findNote } from "../src/service/note.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const notePayload = {
  user: userId,
  title: "Note",
  content: "A note about groceries.",
};

export const secondNotePayload = {
  user: userId,
  title: "Note two",
  content: "A second note about a note.",
};

export const noteUpdatePayload = {
  user: userId,
  title: "Updated note",
  content: "An updated note about groceries.",
};

export const userPayload = {
  _id: userId,
  email: "test@example.com",
  username: "John Smith",
};

describe("note", () => {
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

  describe("GET all note route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).get(`/api/note`);
        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in and no note", () => {
      it("should return a 200 status and an empty array", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .get(`/api/note`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual([]);
      });
    });

    describe("given the user is logged in and one note exist", () => {
      it("should return a 200 status and an array with the note", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        await createNote(notePayload);

        const { statusCode, body } = await supertest(app)
          .get(`/api/note`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body[0]).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          noteId: expect.any(String),
          title: "Note",
          content: "A note about groceries.",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
          favorite: false,
        });
      });
    });

    describe("given the user is logged in and more than one note exist", () => {
      it("should return a 200 status and an array with the notes", async () => {
        const jwt = signJwt(userPayload);

        await createNote(notePayload);
        await createNote(secondNotePayload);

        const { statusCode, body } = await supertest(app)
          .get(`/api/note`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body.length).toBe(2);

        expect(body[0]).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          noteId: expect.any(String),
          title: "Note two",
          content: "A second note about a note.",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
          favorite: false,
        });

        expect(body[1]).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          noteId: expect.any(String),
          title: "Note",
          content: "A note about groceries.",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
          favorite: false,
        });
      });
    });
  });

  describe("GET note route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const invalidId = "1";

        const { statusCode } = await supertest(app).get(
          `/api/note/${invalidId}`
        );
        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in and the note does not exist", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const invalidid = "1";

        const { statusCode } = await supertest(app)
          .get(`/api/note/${invalidid}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the user is logged in and the note does exist", () => {
      it("should return a 200 status and the note", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const note = await createNote(notePayload);

        const noteId = note.noteId;

        const { statusCode, body } = await supertest(app)
          .get(`/api/note/${noteId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body.noteId).toBe(noteId);
      });
    });
  });

  describe("POST create note route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/note")
          .send(notePayload);

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      it("should return a 200 and create the note", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/note")
          .set("Authorization", `Bearer ${jwt}`)
          .send(notePayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          noteId: expect.any(String),
          title: "Note",
          content: "A note about groceries.",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
          favorite: false,
        });
      });
    });
  });

  describe("DELETE note route", () => {
    describe("given the user is not logged in and the note does not exist", () => {
      it("should return a 403", async () => {
        const invalidId = "1";

        const { statusCode } = await supertest(app).get(
          `/api/note/${invalidId}`
        );
        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is not logged in and the note exist", () => {
      it("should return a 403", async () => {
        // @ts-ignore
        const note = await createNote(notePayload);

        const noteId = note.noteId;

        const { statusCode } = await supertest(app).delete(
          `/api/note/${noteId}`
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in and the note does not exist", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const invalidid = "1";

        const { statusCode } = await supertest(app)
          .delete(`/api/note/${invalidid}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the user is logged in and the note does exist", () => {
      it("should return a 200 status", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const note = await createNote(notePayload);

        const noteId = note.noteId;

        const { statusCode } = await supertest(app)
          .delete(`/api/note/${noteId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
      });
    });
  });

  describe("PUT update note route", () => {
    describe("given the user is not logged in and the note does not exist", () => {
      it("should return a 403", async () => {
        const invalidId = "1";

        const { statusCode } = await supertest(app).put(
          `/api/note/${invalidId}`
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is not logged in and the note exist", () => {
      it("should return a 403", async () => {
        // @ts-ignore
        const note = await createNote(notePayload);

        const noteId = note.noteId;

        const { statusCode } = await supertest(app)
          .put(`/api/note/${noteId}`)
          .send(noteUpdatePayload);

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in and the note does not exist", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const invalidid = "1";

        const { statusCode } = await supertest(app)
          .put(`/api/note/${invalidid}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(noteUpdatePayload);

        expect(statusCode).toBe(404);
      });
    });

    describe("given the user is logged in and the note does exist", () => {
      it("should return a 200 status and the updated note", async () => {
        const jwt = signJwt(userPayload);

        // @ts-ignore
        const note = await createNote(notePayload);

        const noteId = note.noteId;

        const { statusCode, body } = await supertest(app)
          .put(`/api/note/${noteId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(noteUpdatePayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          user: expect.any(String),
          noteId: expect.any(String),
          title: "Updated note",
          content: "An updated note about groceries.",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          valid: true,
          favorite: false,
        });
      });
    });
  });
});
