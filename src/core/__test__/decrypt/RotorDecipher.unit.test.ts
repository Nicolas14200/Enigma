import 'reflect-metadata';
import {RotorDecipher} from "../../usecase/decrypt/RotorDecipher";

describe("Unit - RotorDecipher", () => {
    let rotorDecipher: RotorDecipher
    beforeAll(() => {
        rotorDecipher = new RotorDecipher()
    })
    it('Should decrypt a message with rotor', () => {
        const result = rotorDecipher.execute({
            input:"KQF",
            rotorValues:[
                'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
                'AJDKSIRUXBLHWTMCQGZNPYFVOE',
                'BDFHJLCPRTXVZNYEIWGAKMUSQO',
              ],
        })
        expect(result).toEqual('EFG')
    })
})