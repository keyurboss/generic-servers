import { sign, SignOptions, verify } from 'jsonwebtoken';
import { Response } from 'express';

export const Keys = process.env['ACCESS_KEY'] ?? '';
export const Keys1 = process.env['REFRESH_KEY'] ?? '';

export function AuthenticationFunction(token1: string) {
  return VerifyJwtToken(token1, Keys);
}

export function AuthenticateSecureFile(req, res: Response<unknown>, next) {
  const authHeader = req.headers['authorization'];
  const token1 = authHeader && authHeader.split(' ')[1];
  if (token1 == null) return res.sendStatus(401);
  VerifyJwtToken(token1, Keys1)
    .then((user) => {
      res.locals.user = user;
      next();
    })
    .catch((e) => {
      res.status(403).send(e);
    });
}
export function SetImmutableCacheHeader(req, res: Response<unknown>, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, immutable',
  });
  next();
}
export function AuthenticateTokenMiddle(req, res: Response<unknown>, next) {
  const authHeader = req.headers['authorization'];
  const token1 = authHeader && authHeader.split(' ')[1];
  if (token1 == null) return res.sendStatus(401);
  AuthenticationFunction(token1)
    .then((user) => {
      res.locals.user = user;
      next();
    })
    .catch((e) => {
      res.status(403).send(e);
    });
}
export function AuthMiddleWithoutReject(req, res: Response<unknown>, next) {
  const authHeader = req.headers['authorization'];
  const token1 = authHeader && authHeader.split(' ')[1];
  if (token1 == null) {
    res.locals.isLogin = false;
    next();
  } else {
    AuthenticationFunction(token1)
      .then((user) => {
        res.locals.isLogin = true;
        res.locals.user = user;
      })
      .catch(() => {
        res.locals.isLogin = false;
      })
      .finally(() => {
        next();
      });
  }
}
export function SignDataJWT(
  user: Record<string, unknown>,
  key: string,
  options?: SignOptions
): string {
  return sign(user, key, options);
}
export function VerifyJwtToken(token: string, key: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    verify(token, key, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}
