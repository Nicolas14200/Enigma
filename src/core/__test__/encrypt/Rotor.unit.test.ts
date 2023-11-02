import 'reflect-metadata';
import { Rotor } from "../../usecase/encrypt/Rotor";

describe("Unit - Rotor", () => {
    let rotor: Rotor
    let rotorValues:string[]
    beforeAll(()=> {
        rotor = new Rotor();
        rotorValues = [
            'BDFHJLCPRTXVZNYEIWGAKMUSQO',
            'AJDKSIRUXBLHWTMCQGZNPYFVOE',
            'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
          ];
    })
    it("Should encrypt with Rotor", async () => {
        const encryptedMessage = rotor.execute({
            input: 'EFG',
            rotorValues: rotorValues,
          });
          expect(encryptedMessage).toEqual("KQF")
    })

})