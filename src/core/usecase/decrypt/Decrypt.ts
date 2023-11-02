import { inject, injectable } from "inversify";
import { Usecase } from "../Usecase";
import { Identifiers } from "../Identifiers";
import { SecurityShemesRepository } from "@src/core/domain/repositories/SecurityShemesRepository";
import { RotorDecipher } from "./RotorDecipher";
import { CaesarDecipherWithIncrement } from "./CaesarDecipherWithIncrement";

export interface DecryptProps {
    securityModelName:string,
    input:string
}
@injectable()
export class Decrypt implements Usecase<DecryptProps, string>{

    constructor(
        @inject(Identifiers.securityShemesRepository)
        private readonly _securityShemesRepository: SecurityShemesRepository,
        private readonly _rotorDecipher: RotorDecipher,
        private readonly _caesarDecipherWithIncrement: CaesarDecipherWithIncrement
      ) {}

    async execute(payload: DecryptProps): Promise<string> {
        const securityShemes = await this._securityShemesRepository.getByName(payload.securityModelName);
        console.log("securityShemes", securityShemes);
        const rotorValuesReverse = [...securityShemes.props.rotor].reverse();
        const rotorDecipherResult = this._rotorDecipher.execute({
            input:payload.input,
            rotorValues:rotorValuesReverse,
        })
        console.log("rotorDecipherResult", rotorDecipherResult)
        const caesarDecipherWithIncrementResult = this._caesarDecipherWithIncrement.execute({
            input:rotorDecipherResult,
            increment:securityShemes.props.cesar.increment,
            shift:securityShemes.props.cesar.shift,
        })
        console.log("caesarDecipherWithIncrementResult", caesarDecipherWithIncrementResult)
        return caesarDecipherWithIncrementResult;
    }

}