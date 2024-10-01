import aesjs from "aes-js";
const getKey = () => {
  try {
    return JSON.parse(process.env.NEXT_PUBLIC_KEY);
  } catch (e) {
    console.error("Error parsing key:", e);
    throw new Error("Failed to parse encryption key");
  }
};

const key = getKey();

export const encryptaes = (data) => {
  try {
    const textBytes = aesjs.utils.utf8.toBytes(data);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
  } catch (e) {
    console.log(e);
  }
};

export const decryptaes = (data) => {
  try {
    // let d;
    // if (typeof data !== "string") {
    //   d = JSON.stringify(data);
    // } else {
    //   d = data;
    // }
    const encryptedBytes = aesjs.utils.hex.toBytes(data);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
  } catch (e) {
    console.error("Decryption error:", e);
    throw new Error("Decryption failed");
  }
};
