import { IsString } from "class-validator";

export class AddSecurityShemesCommand {
  @IsString()
  name: string;

  cesar: {
    shift: number;
    increment: number;
  };

  rotor: string[];
}
