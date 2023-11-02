import { inject, injectable } from "inversify";
import { Usecase } from "../Usecase";
import { SecurityShemesRepository } from "../../domain/repositories/SecurityShemesRepository";
import { Identifiers } from "../Identifiers";
import { Rotor } from "./Rotor";
import { CaesarCipherWithIncrement } from "./CaesarCipherWithIncrement";

export interface EncryptProps {
    securityModelName:string,
    input:string
}
@injectable()
export class Encrypt implements Usecase<EncryptProps, string> {

    constructor(
        @inject(Identifiers.securityShemesRepository)
        private readonly _securityShemesRepository: SecurityShemesRepository,
        private readonly _rotor: Rotor,
        private readonly _caesarCipherWithIncrement: CaesarCipherWithIncrement
      ) {}

    async execute(payload: EncryptProps): Promise<string> {

        const securityShemes = await this._securityShemesRepository.getByName(payload.securityModelName);

        const caesarResult = this._caesarCipherWithIncrement.execute({
            input: payload.input,
            increment: securityShemes.props.cesar.increment,
            shift: securityShemes.props.cesar.shift,
        })

        const rotorResult = this._rotor.execute({
            input:caesarResult,
            rotorValues:securityShemes.props.rotor,
        })

        return rotorResult
    }

}