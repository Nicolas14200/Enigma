import { IsString } from "class-validator";

export class DecryptMessageCommand {
    @IsString()
    input: string;
    @IsString()
    securityModelName: string;
}