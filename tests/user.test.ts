import mongoose from "mongoose";
import request from "supertest";
import createServer from "../src/utils/server";
import * as UserService from "../src/service/user.service";
import * as SessionService from "../src/service/session.service";
import { createUserSessionHandler } from "../src/controller/session.controller";
import { signJwt } from "../src/utils/jwt.utils";
import UserModel from "../src/models/user.model";
import { deleteUser } from "../src/service/user.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();
const sessionId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: "test@example.com",
  username: "John Smith",
};

const userInput = {
  email: "test@example.com",
  username: "John Smith",
  password: "Password123",
  passwordConfirmation: "Password123",
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  session: sessionId,
  createdAt: new Date("2021-09-30T13:31:07.674Z"),
  updatedAt: new Date("2021-09-30T13:31:07.674Z"),
  __v: 0,
};

const deleteSessionPayload = { accessToken: null, refreshToken: null };

describe("user", () => {
  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await request(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the passwords do not match", () => {
      it("should return a 400", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode } = await request(app)
          .post("/api/users")
          .send({ ...userInput, passwordConfirmation: "doesnotmatch" });

        expect(statusCode).toBe(400);

        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given the user service throws", () => {
      it("should return a 409 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValueOnce("Something went wrong");

        const { statusCode } = await request(createServer())
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(409);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const query = { _id: "user_id" };

      const deleteOneMock = jest
        .spyOn(UserModel, "deleteOne")
        .mockResolvedValueOnce({ acknowledged: true, deletedCount: 1 });

      await deleteUser(query);

      expect(deleteOneMock).toHaveBeenCalledWith(query);
    });
  });

  describe("create user session", () => {
    describe("given the username and password are valid", () => {
      it("should return a signed accessToken, refresh token and user", async () => {
        jest
          .spyOn(UserService, "validatePassword")
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, "createSession")
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return "a user agent";
          },
          body: {
            email: "test@example.com",
            password: "Password123",
          },
        };

        const send = jest.fn();
        const res = {
          send,
        };

        // @ts-ignore
        await createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
          user: expect.any(Object),
        });
      });
    });
  });

  describe("delete user session", () => {
    describe("given the session is valid", () => {
      it("should return accessToken and refreshToken null", async () => {
        jest.spyOn(UserService, "findUser").mockReturnValue(
          // @ts-ignore
          () => {
            return userPayload;
          }
        );
        const updateSessionMock = jest
          .spyOn(SessionService, "updateSession")
          // @ts-ignore
          .mockReturnValue(deleteSessionPayload);

        const jwt = signJwt(userPayload);
        const { statusCode, body } = await request(app)
          .delete("/api/sessions")
          .set("Authorization", `Bearer ${jwt}`)
          .send(sessionPayload);

        expect(updateSessionMock).toHaveBeenCalled();

        expect(body).toEqual(deleteSessionPayload);

        expect(statusCode).toBe(200);
      });
    });
  });
});
