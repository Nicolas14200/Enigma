import { Container } from "inversify";
import { SecurityShemesController } from "../modules/SecurityShemesController";
import { AddSecurityShemes } from "../../core/usecase/AddSecurityShemes";
import { InMemorySecurityShemesRepository } from "../../adapters/inMemory/InMemorySecurityShemesRepository";
import { Identifiers } from "../../core/usecase/Identifiers";
import { Encrypt } from "../../core/usecase/encrypt/Encrypt";
import { Rotor } from "../../core/usecase/encrypt/Rotor";
import { CaesarCipherWithIncrement } from "../../core/usecase/encrypt/CaesarCipherWithIncrement";
import { CaesarDecipherWithIncrement } from "../../core/usecase/decrypt/CaesarDecipherWithIncrement";
import { RotorDecipher } from "../../core/usecase/decrypt/RotorDecipher";
import { Decrypt } from "../../core/usecase/decrypt/Decrypt";

export class AppDependencies extends Container {

    init(){
        this.bind(AddSecurityShemes).toSelf()
        this.bind(Identifiers.securityShemesRepository).toConstantValue(new InMemorySecurityShemesRepository(new Map()))
        this.bind(SecurityShemesController).toSelf()
        
        this.bind(CaesarDecipherWithIncrement).toSelf()
        this.bind(Decrypt).toSelf()
        this.bind(RotorDecipher).toSelf()

        this.bind(Encrypt).toSelf()
        this.bind(Rotor).toSelf()
        this.bind(CaesarCipherWithIncrement).toSelf()



        return this;
    }
}