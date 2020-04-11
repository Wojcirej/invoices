import jwt from "jsonwebtoken";
import config from "../../../config.json";

const { privateKey } = config[process.env.ENV];

const twentyMinutesInSeconds = 60 * 20;

export class JsonWebToken {
  static encode(payload, expiration: number = twentyMinutesInSeconds): string {
    const objectToEncode = { data: payload, exp: Math.floor(Date.now() / 1000) + expiration };
    return jwt.sign(objectToEncode, privateKey);
  }

  static decode(token: string) {
    return jwt.verify(token, privateKey);
  }
}
