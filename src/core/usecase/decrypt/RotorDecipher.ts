import { injectable } from "inversify";
import { Usecase } from "../Usecase";

export interface RotorDecipherProps {
    input: string;
    rotorValues: string[];
}

@injectable()
export class RotorDecipher implements Usecase<RotorDecipherProps, string> {
    execute(payload: RotorDecipherProps): string {
        let result = payload.input;

        for (const rotorValue of payload.rotorValues) {
            let tempResult = '';
            for (let i = 0; i < result.length; i++) {
                const char = result[i];
                if (char >= 'A' && char <= 'Z') {
                    const position = rotorValue.indexOf(char);
                    const originalChar = String.fromCharCode('A'.charCodeAt(0) + position);
                    tempResult += originalChar;
                } else {
                    tempResult += char;
                }
            }
            result = tempResult;
        }

        return result;
    }
}