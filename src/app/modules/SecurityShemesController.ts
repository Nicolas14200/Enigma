import { AddSecurityShemes } from "../../core/usecase/AddSecurityShemes";
import { injectable } from "inversify";
import { Body, JsonController, Post, Res } from "routing-controllers";
import { AddSecurityShemesCommand } from "./commands/AddSecurityShemesCommand";
import { Response } from "express";
import { EncryptMessageCommand } from "./commands/EncryptMessageCommand";
import { Encrypt } from "../../core/usecase/encrypt/Encrypt";
import { Decrypt } from "../../core/usecase/decrypt/Decrypt";
import { DecryptMessageCommand } from "./commands/DecryptMessageCommand";

@JsonController("/securityShemes")
@injectable()
export class SecurityShemesController {
  constructor(private readonly _addSecurityShemes: AddSecurityShemes,
              private readonly _encryptMessage: Encrypt,
              private readonly _decryptMessage: Decrypt) {}

  @Post("/add")
  async addSecurityShemes(
    @Res() response: Response,
    @Body() cmd: AddSecurityShemesCommand
  ) {
    try {
      const securityShemes = await this._addSecurityShemes.execute({
        name: cmd.name,
        cesar: {
          increment: cmd.cesar.increment,
          shift: cmd.cesar.shift,
        },
        rotor: cmd.rotor
      });
      return response.status(201).send(securityShemes);
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  @Post("/encrypt")
  async encrypt(
    @Res() response: Response,
    @Body() cmd: EncryptMessageCommand
  ) {
    try {
        const encryptMessage = await this._encryptMessage.execute({
            input:cmd.input,
            securityModelName:cmd.securityModelName,
        })
      return response.status(200).send(encryptMessage);
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  @Post("/decrypt")
  async decrypt(
    @Res() response: Response,
    @Body() cmd: DecryptMessageCommand
  ) {
    try {
        const decryptMessage = await this._decryptMessage.execute({
            input:cmd.input,
            securityModelName:cmd.securityModelName,
        })
      return response.status(200).send(decryptMessage);
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
}
