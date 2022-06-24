require('dotenv').config();

import { sign, verify } from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;
const algorithm = process.env.JWT_ALG;
const expiresIn = process.env.JWT_EXP;
const issuer = process.env.JWT_ISSUER;

const option = { algorithm, expiresIn, issuer };

function makeToken(payload) {
  return sign(payload, secretKey, option);
}

function decodePayload(token) {
  return verify(token, secretKey);
}

export default { makeToken, decodePayload };