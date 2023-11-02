import { inject, injectable } from "inversify";
import {
  SecuritySchemes,
} from "../domain/entities/SecuritySchemes";
import { SecurityShemesRepository } from "../domain/repositories/SecurityShemesRepository";
import { Usecase } from "./Usecase";
import { Identifiers } from "./Identifiers";

export interface AddSecurityShemesProps {
  name:string,
  cesar: {
    shift: number;
    increment: number;
  };
  rotor:string[]
}

@injectable()
export class AddSecurityShemes
  implements Usecase<AddSecurityShemesProps, SecuritySchemes>
{
  constructor(
    @inject(Identifiers.securityShemesRepository)
    private readonly _securityShemesRepository: SecurityShemesRepository
  ) {}

  async execute(payload: AddSecurityShemesProps): Promise<SecuritySchemes> {
    const securitySchemes = SecuritySchemes.create(payload);
    return await this._securityShemesRepository.save(securitySchemes);
  }
}
