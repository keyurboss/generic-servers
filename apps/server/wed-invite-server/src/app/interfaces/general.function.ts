import { HttpException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TransferError(error: any, status = 400) {
  throw new HttpException(
    typeof error === 'string'
      ? error
      : error.text || error.message || error.error || 'Something Went Wrong',
    status
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TransferValidationError(error: any, status = 400) {
  throw new HttpException({ error, status }, status);
}

export function WaitForSomeTime(time: number): Promise<void> {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
}
export function getRandomNumbers(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function GetUUID() {
  return uuid();
}

export function GetTimeStamp() {
  return Math.floor(Date.now() / 1000);
}
