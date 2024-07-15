export const stringToCharCodeArray = (text: string) => {
  const data = [];
  for (let i = 0; i < 16; i++) {
    data.push(0);
  }
  for (let i = 0; i < text.length; i++) {
    data[i] = text.charCodeAt(i);
  }
  return data;
};

export const byteToString = (data: ArrayBufferLike | ArrayLike<number>) => {
  const byteData = new Uint8Array(data);
  const textDecoder = new TextDecoder('utf-8');
  const decodedData = textDecoder.decode(byteData);
  return decodedData;
};

export const stringToByteArray = (data: string) => {
  const byteArray = new TextEncoder().encode(data);
  return byteArray;
};

export const bytesToInteger = (data: number[]) => {
  let value = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    value = value * 256 + data[i];
  }
  return value;
};

export function jsonToByteArray(jsonObject: {[key: string]: any}): number[] {
  // Convert the JSON object to a string
  const jsonString = JSON.stringify(jsonObject);

  // Convert the string to a byte array
  const byteArray: number[] = [];
  for (let i = 0; i < jsonString.length; i++) {
    byteArray.push(jsonString.charCodeAt(i));
  }

  return byteArray;
}
