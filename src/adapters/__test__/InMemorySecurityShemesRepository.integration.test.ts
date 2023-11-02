import 'reflect-metadata';
import {SecuritySchemes} from "../../core/domain/entities/SecuritySchemes";
import { InMemorySecurityShemesRepository } from "../inMemory/InMemorySecurityShemesRepository";

describe('Integration - InMemorySecurityShemesRepository', () => {
    let securitySchemesEnigma1:SecuritySchemes;
    let inMemorySecurityShemesRepository: InMemorySecurityShemesRepository;
    beforeAll(async () => {
        inMemorySecurityShemesRepository = new InMemorySecurityShemesRepository(new Map())
        securitySchemesEnigma1 = SecuritySchemes.create({
            name:"Enigma-1",
            cesar: {
              shift: 4,
              increment: 1,
            },
            rotor: [
                "BDFHJLCPRTXVZNYEIWGAKMUSQO",
                "AJDKSIRUXBLHWTMCQGZNPYFVOE",
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              ]
          })
          await inMemorySecurityShemesRepository.save(securitySchemesEnigma1)
    })
    it("Should save a securitySchemes", async () => {
        const shemesSave = await inMemorySecurityShemesRepository.save(securitySchemesEnigma1);
        expect(shemesSave.props.name).toEqual('Enigma-1')
    })
    it("Should get a securitySchemes by is name", async () => {
        const shemesSave = await inMemorySecurityShemesRepository.getByName("Enigma-1");
        expect(shemesSave.props.rotor[0]).toEqual("BDFHJLCPRTXVZNYEIWGAKMUSQO")
    })

})