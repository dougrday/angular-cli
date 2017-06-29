import { HELLO } from './types';

export function helloWorld(message: string = "Hello World!") {
  return {
    type: HELLO.WORLD,
    payload: message
  };
}
