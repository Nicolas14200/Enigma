import { SecuritySchemes } from "../entities/SecuritySchemes";

export interface SecurityShemesRepository {
    save(securitySchemes:SecuritySchemes):Promise<SecuritySchemes>
    getByName(name:string):Promise<SecuritySchemes>
}