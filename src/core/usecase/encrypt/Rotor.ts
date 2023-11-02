import { injectable } from "inversify";
import { Usecase } from "../Usecase";

export interface RotorProps {
    input:string,
    rotorValues:string[]
}
@injectable()
export class Rotor implements Usecase<RotorProps, string> {
    execute(payload: RotorProps): string {
        let result = payload.input;

        for (const rotorValue of payload.rotorValues) {
          let tempResult = '';
          for (let i = 0; i < result.length; i++) {
            const char = result[i];
            if (char >= 'A' && char <= 'Z') {
              const position = char.charCodeAt(0) - 'A'.charCodeAt(0);
              const rotorChar = rotorValue[position];
              tempResult += rotorChar;
            } else {
              tempResult += char;
            }
          }
          result = tempResult;
        }
    
        return result;
    }

}