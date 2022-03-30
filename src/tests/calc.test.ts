import { Scalc } from "../index";
import { logger } from "../index";
let calculator: Scalc;

beforeAll(() => {
  calculator = new Scalc(new logger());
  jest.spyOn(calculator, "Add");
  jest.spyOn(calculator.logger, "log");
});

describe("Test for main method", () => {
  it("Should expect the welcome and info string", () => {
    expect(calculator.logger.log).toHaveBeenCalledWith("Welcome to scalc");
    expect(calculator.logger.log)
      .toHaveBeenCalledWith(`Correct syntax for this program will be: (scalc 1,2,3), (“scalc //[***][%%%]
    \n1***2%%%4")`);
    expect(calculator.logger.log).toHaveBeenCalledTimes(2);
  });
});

describe("Test for scalc (add) method", () => {
  it("Should return The result is 7", () => {
    const sum = calculator.Add("scalc //[***][%%%]\n1***2%%%4");
    expect(sum).toBe(7);
  });
  it("Should return The result is 32", () => {
    const sum = calculator.Add("//[*][%]\n10*2%20");
    expect(sum).toBe(32);
  });
  it("Should return The result is 12", () => {
    const sum = calculator.Add("//*\n10*2");
    expect(sum).toBe(12);
  });
  it("Should return The result is 30", () => {
    const sum = calculator.Add("10,20");
    expect(sum).toBe(30);
  });
});
