/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { JSONObjectKeyAndTypeValidator } from './GeneralInterFace';
import { config } from '../variable';
const GlobalVar={
  token:{
    accessToken:config.tokens
  }
}
export function AuthenticationFunction(token1: string) {
  return VerifyJwtToken(token1, GlobalVar.token.accessToken);
}
export function AuthenticateTokenMiddle(req, res: Response<any>, next) {
  const authHeader = req.headers['authorization'];
  const token1 = authHeader && authHeader.split(' ')[1];
  if (token1 == null) return res.sendStatus(401);
  AuthenticationFunction(token1)
    .then((user) => {
      res.locals.user = user;
      next();
    })
    .catch((e:never) => {
      res.status(403).send(e);
    });
}

export function AuthMiddleWithoutReject(req, res: Response<any>, next) {
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
  user: any,
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

export function GetTimeStamp() {
  return Math.floor(Date.now() / 1000);
}
export function ValidateJSONObject(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  Validator: JSONObjectKeyAndTypeValidator[]
): boolean {
  Validator.forEach((a) => {
    if (a.required || typeof data[a.key] !== 'undefined') {
      const e = new Error(`Value of Key ${a.key} Not Found`);
      if (typeof data[a.key] !== a.type && a.type !== 'any') {
        throw e;
      }
      if (a.regex) {
        let dataCC = data[a.key];
        if (typeof dataCC !== 'string') {
          dataCC = dataCC.toString();
        }
        if (a.regex.test(dataCC) === false) {
          e.message = a.key + ' Regexp MisMAtch';
          throw e;
        }
      }
      if (a.Extra && Array.isArray(a.Extra)) {
        ValidateJSONObject(data[a.key], a.Extra);
      }
    }
  });
  return true;
}
export function GenerateLoginTokens(data: any) {
  return {
    accessToken: SignDataJWT(data, GlobalVar.token.accessToken, {
      expiresIn: '1d',
    }),
  };
}
export function AllowedUserwithUserID(req, res: Response<any>, next) {
  if (res.locals && res.locals.user && typeof res.locals.user.id === 'number') {
    next();
  } else {
    res.sendStatus(405);
  }
}
export function AllowedAdmin(req, res: Response<any>, next) {
  if (
    res.locals &&
    res.locals.user &&
    typeof res.locals.user.user_type === 'number' &&
    res.locals.user.user_type === 0
  ) {
    next();
  } else {
    res.sendStatus(403);
  }
}

export function VolumeCutPIPE(value: any) {
  const num = Number(value);
  if (num < 1000) {
    return num + ' GM';
  } else {
    return num / 1000 + ' Kg';
  }
}
export function WaitForSomeTime(time: number): Promise<void> {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
}