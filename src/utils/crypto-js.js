import { AES, enc } from 'crypto-js';

export const encryptData = (plainMessage, encKey) => {
  return AES.encrypt(plainMessage, encKey).toString();
};

export const decryptData = (encryptedMessage, decKey) => {
  return AES.decrypt(encryptedMessage, decKey).toString(enc.Utf8);
};

const setChunkIdData = (encryptedDataChunk, currentChunk, totalChunks) => `${encryptedDataChunk}/c${currentChunk}t${totalChunks}==`;

const extractChunkIdData = (encryptedDataChunk) => {
  const chunkIdDataRegex = /\/c([0-9])t([0-9])==$/;
  const chunkIdDataResult = encryptedDataChunk.match(chunkIdDataRegex);

  if (chunkIdDataResult === null) {
    return { currentChunk: -1, totalChunks: -1 };
  }

  return { currentChunk: chunkIdDataResult[1], totalChunks: chunkIdDataResult[2] };
}

export const splitEncryptedData = (encryptedData, chunks) => {
  const encryptedDataChunks = [];
  const totalChunks = chunks <= 0 ? 1 : chunks;
  const chunkLength = Math.ceil(encryptedData.length / chunks);
  
  for (let currentChunk = 1, chunkBeginIndex = 0; totalChunks >= currentChunk; currentChunk++, chunkBeginIndex += chunkLength) {
    const encryptedChunk = encryptedData.slice(chunkBeginIndex, chunkBeginIndex + chunkLength);
    encryptedDataChunks.push({
      data: setChunkIdData(encryptedChunk, currentChunk, totalChunks)
    });
  };

  return encryptedDataChunks;
};
