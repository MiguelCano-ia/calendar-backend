import bcrypt from "bcryptjs";
import generateJWT from "../helpers/jwt";
import type { Request, Response } from "express";
import type { RequestWithUser } from "../middlewares/jwt-validator";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        ok: false,
        msg: "The user already exists",
      });
      return;
    }

    // Send to moongose the data
    user = new User(req.body);

    // Encrypt the password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save the user, async operation
    await user.save();

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      _id: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        ok: false,
        msg: "The user email does not exist",
      });
      return;
    }

    // Confirm the password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      res.status(400).json({
        ok: false,
        msg: "The password is not correct",
      });
      return;
    }

    // Generate the JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      _id: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

export const renewToken = async (req: RequestWithUser, res: Response) => {
  const { uid, name } = req.auth!;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    _id: uid,
    name,
    token,
  });
};
