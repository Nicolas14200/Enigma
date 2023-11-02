import 'reflect-metadata';
import { CaesarCipherWithIncrement } from "../../usecase/encrypt/CaesarCipherWithIncrement";

describe("Unit - CaesarCipherWithIncrement", () => {

  let caesarCipherWithIncrement: CaesarCipherWithIncrement;

  beforeAll(() => {
    caesarCipherWithIncrement = new CaesarCipherWithIncrement();
  });
  
  it("Should return EFG", async () => {
    const result = caesarCipherWithIncrement.execute({
      input: "AAA",
      increment: 1,
      shift: 4,
    });
    expect(result).toEqual('EFG')
  });

  it("Should return FGH", async () => {
    const result = caesarCipherWithIncrement.execute({
      input: "BBB",
      increment: 1,
      shift: 4,
    });
    expect(result).toEqual('FGH')
  });
});
