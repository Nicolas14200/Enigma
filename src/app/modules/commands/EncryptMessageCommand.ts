import { IsString } from "class-validator";

export class EncryptMessageCommand {
    @IsString()
    input: string;
    @IsString()
    securityModelName: string;
}