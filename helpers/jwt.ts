import jwt from "jsonwebtoken";

const generateJWT = (uid: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED as string,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("The token could not be generated");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateJWT;
