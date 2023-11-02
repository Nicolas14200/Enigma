import 'reflect-metadata';
import { SecuritySchemes } from "../domain/entities/SecuritySchemes";
import { InMemorySecurityShemesRepository } from "../../adapters/inMemory/InMemorySecurityShemesRepository";

describe("Unit - AddSecurityShemes", () => {
  let securityShemesRepo: InMemorySecurityShemesRepository;
  beforeAll(() => {
    securityShemesRepo = new InMemorySecurityShemesRepository(new Map());
  });
  it("Should create a security Shemes", async () => {
    const securityShemes = SecuritySchemes.create({
      name: "Enigma-1",
      cesar: {
        shift: 4,
        increment: 1,
      },
      rotor: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      ],
    });
    expect(typeof securityShemes.props.id).toBe("string");
  });
  it("Should save security Shemes in repo", async () => {
    const securityShemes = SecuritySchemes.create({
      name: "Enigma-1",
      cesar: {
        shift: 4,
        increment: 1,
      },
      rotor: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      ],
    });
    const saveSecurityShemes = await securityShemesRepo.save(securityShemes);
    expect(typeof saveSecurityShemes.props.id).toBe("string");
  });
});
