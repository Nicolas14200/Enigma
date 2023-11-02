import { SecuritySchemes } from "../../../domain/entities/SecuritySchemes";
import { SecurityShemesRepository } from "../../../domain/repositories/SecurityShemesRepository";

export class InMemorySecurityShemesRepository implements SecurityShemesRepository {

    constructor(readonly securityShemesMap: Map < string, SecuritySchemes > ){}

    async getByName(name: string): Promise<SecuritySchemes> {
        const securitySchemes: SecuritySchemes = this.securityShemesMap.get(name)
        if (!securitySchemes) {
            throw new Error("securitySchemes not exist")
          }
        return this.securityShemesMap.get(name);
    }
    
    async save(securitySchemes: SecuritySchemes): Promise<SecuritySchemes> {
         this.securityShemesMap.set(securitySchemes.props.name, securitySchemes);  
         return securitySchemes;
    }
    
}