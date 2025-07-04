import { JwtPayload } from 'jsonwebtoken'; // O el tipo que uses para tu payload

declare module 'express' {
  interface Request {
    user?: any; // O reemplaza 'any' por el tipo de tu payload, por ejemplo: JwtPayload
  }
}