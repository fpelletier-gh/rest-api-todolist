import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser, deleteUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  const user = omit(res.locals.user, ["password", "__v"]);
  return res.send(user);
}

export async function deleteCurrentUserHandler( req: Request, res: Response) {
  /* #swagger.security = [
    { "apiKeyAccessToken": [] },
    { "apiKeyRefreshToken": [] },
    { "apiKeyAccessTokenCookie": [] },
    { "apiKeyRefreshTokenCookie": [] }
  ] */
    // #swagger.summary = 'Delete current user.'
    // #swagger.summary = 'Delete current user.'
  const userId = res.locals.user._id;

  try {
    await deleteSessions({ user: userId });
    await deleteTodolists({ user: userId });
    await deleteNotes({ user: userId });
    await deleteUser({ _id: userId });
    return res.sendStatus(200);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send("Something went wrong, please try again");
  }
}