import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const testUser = payload.userId === "6369496200fa08d776b1e6ac";

    req.user = { userId: payload.userId, testUser };

    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid!");
  }
};

export default auth;
