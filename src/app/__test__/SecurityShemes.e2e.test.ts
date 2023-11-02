import 'reflect-metadata';
import express from "express";
import request from "supertest";
import { configureExpress } from "../config/configureExpress";
import { InMemorySecurityShemesRepository } from '../../adapters/inMemory/InMemorySecurityShemesRepository';
import { SecuritySchemes } from '../../core/domain/entities/SecuritySchemes';

const app = express();

configureExpress(app);

describe("e2e SecurityShemesController", () => {

  let securityShemesRepo : InMemorySecurityShemesRepository;
  let securityShemes01: SecuritySchemes;

  beforeAll(async () => {
    securityShemesRepo = new InMemorySecurityShemesRepository(new Map())
    securityShemes01 = SecuritySchemes.create({
      name: "Enigma-1",
      cesar: {
        shift: 4,
        increment: 1,
      },
      rotor: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
    });
    await securityShemesRepo.save(securityShemes01)
  })
  it("Should save a security shemes and return 201", async () => {
    await request(app)
    .post("/securityShemes/add")
    .send({
        name:"Enigma-1",
        cesar: {
          shift: 4,
          increment: 1,
        },
        rotor: [
          "BDFHJLCPRTXVZNYEIWGAKMUSQO",
          "AJDKSIRUXBLHWTMCQGZNPYFVOE",
          "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        ]
      })
    .expect(201)
  });
  it("Should encrypt a message and return 200", async () => {
    await request(app)
    .post("/securityShemes/encrypt")
    .send({
      input:"AAA",
      securityModelName:"Enigma-1",
      })
      .expect( response => {
        expect(response.text).toEqual("KQF")
    })
    .expect(200)
  });
  it("Should decrypt a message and return 200", async () => {
    await request(app)
    .post("/securityShemes/decrypt")
    .send({
      input:"KQF",
      securityModelName:"Enigma-1",
      })
      .expect( response => {
        expect(response.text).toEqual("AAA")
    })
    .expect(200)
  });
});
