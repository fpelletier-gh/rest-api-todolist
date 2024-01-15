import { get } from "lodash";
import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";
import { findUser } from "../service/user.service";
import { UserDocument } from "../models/user.model";

export async function verifyIfUserExistInDb(_id: UserDocument["_id"]) {
  if (!_id) return false;
  const user = await findUser({ _id });
  return user ? true : false;
}

const deserialiseUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken =
    get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  const userIsInDb = await verifyIfUserExistInDb(get(decoded, "_id"));

  if (decoded && userIsInDb) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken && typeof refreshToken === "string") {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      const result = verifyJwt(newAccessToken);
      res.locals.user = result.decoded;

      return next();
    }
  }

  return next();
};

export default deserialiseUser;
