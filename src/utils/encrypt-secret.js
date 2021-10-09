import QRCode from 'qrcode';
import { encryptData, splitEncryptedData } from './crypto-js';

export default async function encryptSecret(secret, key, chunks) {
  const encryptedResult = { error: false, errorMsg: '', chunks: [] };
  const encryptedSecret = encryptData(secret, key);
  const encryptedSecretChunks = splitEncryptedData(encryptedSecret, chunks);

  encryptedSecretChunks.map(async chunk => {
    try {
      encryptedResult.chunks.push({
        ...chunk,
        qrcodeDataURL: await QRCode.toDataURL(chunk.data)
      });
    } catch (err) {
      encryptedResult.error = true;
      encryptedResult.errorMsg = err.message;
    }
  });

  return encryptedResult;
};
