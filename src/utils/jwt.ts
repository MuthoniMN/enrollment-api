import jwt from "jsonwebtoken";

const key = process.env.SECRET_KEY as string;

export const generateToken = (data: { id: number, username: string }) => {
  const token = jwt.sign({ user: data }, key, { expiresIn: "2d" })

  return token;
}

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, key);

  return decoded;
}
