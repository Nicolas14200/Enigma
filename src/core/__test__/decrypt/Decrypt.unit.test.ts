import 'reflect-metadata';
import {InMemorySecurityShemesRepository} from "../adapters/inMemory/InMemorySecurityShemesRepository"
import {RotorDecipher} from "../../usecase/decrypt/RotorDecipher";
import {CaesarDecipherWithIncrement} from "../../usecase/decrypt/CaesarDecipherWithIncrement";
import {Decrypt} from "../../usecase/decrypt/Decrypt";
import { SecuritySchemes } from "../../domain/entities/SecuritySchemes";

describe("Unit - Decrypt", () => {
    let securityShemesRepo: InMemorySecurityShemesRepository; 
    let caesarDecipherWithIncrement: CaesarDecipherWithIncrement;
    let rotorDecipher: RotorDecipher;
    let decrypt: Decrypt;
    let securityShemes01: SecuritySchemes;
    let securityShemes02: SecuritySchemes;
    let securityShemes03: SecuritySchemes;
    beforeAll(async () => {
        securityShemesRepo = new InMemorySecurityShemesRepository(new Map());
        caesarDecipherWithIncrement = new CaesarDecipherWithIncrement();
        rotorDecipher = new RotorDecipher();
        decrypt = new Decrypt(securityShemesRepo, rotorDecipher, caesarDecipherWithIncrement);
        securityShemes01 = SecuritySchemes.create({
            name: "Enigma-1",
            cesar: {
              shift: 4,
              increment: 1,
            },
            rotor: [
              "BDFHJLCPRTXVZNYEIWGAKMUSQO",
              "AJDKSIRUXBLHWTMCQGZNPYFVOE",
              "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
            ],
          });
          await securityShemesRepo.save(securityShemes01)
          securityShemes02 = SecuritySchemes.create({
            name: "Enigma-2",
            cesar: {
              shift: 9,
              increment: 1,
            },
            rotor: [
              "BDFHJLCPRTXVZNYEIWGAKMUSQO",
              "AJDKSIRUXBLHWTMCQGZNPYFVOE",
              "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
            ],
          });
          await securityShemesRepo.save(securityShemes02)
          securityShemes03 = SecuritySchemes.create({
            name: "Enigma-3",
            cesar: {
              shift: 9,
              increment: 3,
            },
            rotor: [
              "BDFHTXVZNYEIWGAKMUSQOJLCPR",
              "AJDKSIRUXBGZNPYFVOELHWTMCQ",
              "TOWYHXUSPAIBRCJEKMFLGDQVZN",
            ],
          });
          await securityShemesRepo.save(securityShemes03)
    })
    it("Should decrypt a message", async () => {
        const result = await decrypt.execute({
            input: "KQF",
            securityModelName: "Enigma-1",
        })
        expect(result).toEqual("AAA")
    })
    it("Should decrypt a message", async () => {
        const result = await decrypt.execute({
            input: "PQSACVVTOISXFXCIAMQEM",
            securityModelName: "Enigma-2",
        })
        expect(result).toEqual("EVERYONEISWELCOMEHERE")
    })
    it("Should decrypt a message", async () => {
        const result = await decrypt.execute({
            input: "MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ",
            securityModelName: "Enigma-3",
        })
        expect(result).toEqual("EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE")
    })
})