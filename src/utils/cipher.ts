// src\utils\cipher.ts
import crypto from 'crypto-es'

// 注意 key 和 iv 至少都需要 16 位
const AES_KEY = '1111111111000000'
const AES_IV = '0000001111111111'
export class AesEncryption {
  private key

  private iv

  constructor(key = AES_KEY, iv = AES_IV) {
    this.key = crypto.enc.Utf8.parse(key)
    this.iv = crypto.enc.Utf8.parse(iv)
  }

  get getOptions() {
    return {
      mode: crypto.mode.ECB,
      padding: crypto.pad.Pkcs7,
      iv: this.iv,
    }
  }

  get getCBCOptions() {
    return {
      mode: crypto.mode.CBC,
      padding: crypto.pad.ZeroPadding,
      iv: this.iv,
    }
  }

  encryptByAES(text: string) {
    return crypto.AES.encrypt(text, this.key, this.getOptions).toString()
  }

  decryptByAES(text: string) {
    return crypto.AES.decrypt(text, this.key, this.getOptions).toString(crypto.enc.Utf8)
  }

  encryptByCBC(text: string) {
    return crypto.AES.encrypt(text, this.key, this.getCBCOptions).toString()
  }

  decryptByCBC(text: string) {
    return crypto.AES.decrypt(text, this.key, this.getCBCOptions).toString(crypto.enc.Utf8)
  }
}
