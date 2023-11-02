import 'reflect-metadata';
import { InMemorySecurityShemesRepository } from "../adapters/inMemory/InMemorySecurityShemesRepository";
import { SecuritySchemes } from "../../domain/entities/SecuritySchemes";
import { Encrypt } from '../../usecase/encrypt/Encrypt';
import { Rotor } from '../../usecase/encrypt/Rotor';
import { CaesarCipherWithIncrement } from '../../usecase/encrypt/CaesarCipherWithIncrement';

describe("unit - Encrypt", () => {

  let encrypt: Encrypt;
  let caesarCipherWithIncrement: CaesarCipherWithIncrement;
  let rotor: Rotor;
  let securityShemesRepo: InMemorySecurityShemesRepository;
  let securityShemes01: SecuritySchemes;
  let securityShemes02: SecuritySchemes;
  let securityShemes03: SecuritySchemes;

  beforeAll(async () => {
    caesarCipherWithIncrement = new CaesarCipherWithIncrement();
    rotor = new Rotor();
    securityShemesRepo = new InMemorySecurityShemesRepository(new Map())
    encrypt = new Encrypt(securityShemesRepo, rotor, caesarCipherWithIncrement);

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
  });
  it("Should Encrypt an input message", async () => {
    const result = await encrypt.execute({
        input:"AAA",
        securityModelName:"Enigma-1",
    })
    expect(result).toEqual("KQF")
  })
  it("Should Encrypt an input message", async () => {
    const result = await encrypt.execute({
        input:"EVERYONEISWELCOMEHERE",
        securityModelName:"Enigma-2",
    })
    expect(result).toEqual("PQSACVVTOISXFXCIAMQEM")
  })
  it("Should Encrypt an input message", async () => {
    const result = await encrypt.execute({
        input:"EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
        securityModelName:"Enigma-3",
    })
    expect(result).toEqual("MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ")
  })
}); 
