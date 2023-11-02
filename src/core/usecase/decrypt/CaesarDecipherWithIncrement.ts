import { injectable } from "inversify";
import { Usecase } from "../Usecase";
import { alphabet } from "../../domain/valuesObject/alphabet";

export interface CaesarDecipherWithIncrementProps {
  input: string;
  increment: number;
  shift: number;
}

@injectable()
export class CaesarDecipherWithIncrement
  implements Usecase<CaesarDecipherWithIncrementProps, string>
{
  execute(payload: CaesarDecipherWithIncrementProps): string {
    let { input, increment, shift } = payload;
    let result = '';

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (alphabet.includes(char)) {
        const position = alphabet.indexOf(char);
        const shiftedPosition = (position - shift) % 26;
        const shiftedChar =
          alphabet[shiftedPosition < 0 ? 26 + shiftedPosition : shiftedPosition];
        result += shiftedChar;
        shift += increment;
      } else {
        result += char;
      }
    }
    return result;
  }
}