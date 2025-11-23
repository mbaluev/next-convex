import { RandomReader, generateRandomString } from '@oslojs/crypto/random';

export const generateToken = () => {
  const random: RandomReader = {
    read(bytes) {
      crypto.getRandomValues(bytes);
    },
  };
  const alphabet = '0123456789';
  const length = 6;
  return generateRandomString(random, alphabet, length);
};
