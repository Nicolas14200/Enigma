import { injectable } from "inversify";
import { alphabet } from "../../domain/valuesObject/alphabet";
import { Usecase } from "../Usecase";

export interface CaesarCipherWithIncrementProps {
  input: string;
  increment: number;
  shift: number;
}
@injectable()
export class CaesarCipherWithIncrement
  implements Usecase<CaesarCipherWithIncrementProps, string>
{
  execute(payload: CaesarCipherWithIncrementProps): string {
    let { input, increment, shift } = payload;
    let result = '';

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (alphabet.includes(char)) {
        const position = alphabet.indexOf(char);
        const shiftedPosition = (position + shift) % 26;
        const shiftedChar = alphabet[shiftedPosition];
        result += shiftedChar;
        shift += increment; 
      } else {
        result += char;
      }
    }
    return result;
  }
}
