export const DbConfigProvider = 'DbConfigProvider';

export abstract class DbConfig {
  abstract readonly host: string;
  abstract readonly port: number;
  abstract readonly username: string;
  abstract readonly password: string;
  abstract readonly database: string;
}
