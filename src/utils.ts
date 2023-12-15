import * as crypto from 'crypto';
import { CustomException } from './exception/customException';

export function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

export function verifyEmail(address) {
  const regEmail =
    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //验证邮箱正则
  if (!regEmail.test(address)) {
    throw new CustomException(1, '邮箱格式不对，请重新输入');
  }
}
