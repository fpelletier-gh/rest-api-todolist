import config from "config";
import { Request, Response } from "express";
import { omit } from "lodash";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  // #swagger.summary = 'Create a new user session.'
  // #swagger.description = 'Create a new user session.'
  /*  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Information needed to create a session.',
      schema: { $ref: '#/definitions/CreateSession' }
  } */
  /* #swagger.responses[200] = {
    description: 'successful operation',
    schema: { $ref: '#/definitions/CreateSessionResponse' }
  } */
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenExpiration") }
  );

  // Create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenExpiration") }
  );

  const currentUser = omit(user, "__v");

  // return access and refresh tokens
  return res.send({ accessToken, refreshToken, user: currentUser });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  /* #swagger.security = [
    { "apiKeyAccessToken": [] },
    { "apiKeyRefreshToken": [] },
    { "apiKeyAccessTokenCookie": [] },
    { "apiKeyRefreshTokenCookie": [] }
  ] */
  // #swagger.summary = 'Get current user session.'
  // #swagger.description = 'Get current user session.'
  /* #swagger.responses[200] = {
    description: 'successful operation',
    schema: { $ref: '#/definitions/GetSessionResponse' }
  } */
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  /* #swagger.security = [
    { "apiKeyAccessToken": [] },
    { "apiKeyRefreshToken": [] },
    { "apiKeyAccessTokenCookie": [] },
    { "apiKeyRefreshTokenCookie": [] }
  ] */
  // #swagger.summary = 'Delete current user session.'
  // #swagger.description = 'Delete current user session.'
  /* #swagger.responses[200] = {
    description: 'successful operation',
    schema: { $ref: '#/definitions/DeleteSessionResponse' }
  } */
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
