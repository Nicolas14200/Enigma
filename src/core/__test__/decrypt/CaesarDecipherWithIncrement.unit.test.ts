import 'reflect-metadata';
import { CaesarDecipherWithIncrement } from "../../usecase/decrypt/CaesarDecipherWithIncrement";

describe('Unit - CaesarDecipherWithIncrement', () => {
    let caesarDecipherWithIncrement: CaesarDecipherWithIncrement
    beforeAll(() => {
        caesarDecipherWithIncrement = new CaesarDecipherWithIncrement();
      });
      
  it("Should return AAA", async () => {
    const result = caesarDecipherWithIncrement.execute({
      input: "EFG",
      increment: 1,
      shift: 4,
    });
    expect(result).toEqual('AAA')
  });
})