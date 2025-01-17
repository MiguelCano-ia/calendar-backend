import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  uid: string;
  name: string;
}

export interface RequestWithUser extends Request {
  auth?: TokenPayload;
}

const validJWT = (req: RequestWithUser, res: Response, next: NextFunction) => {
  // x-token headers

  const token = req.header("x-token");

  if (!token) {
    res.status(401).json({
      ok: false,
      msg: "There is no token in the request",
    });
    return;
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED!
    ) as TokenPayload;

    req.auth = payload;
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
    return;
  }

  next();
};

export default validJWT;
