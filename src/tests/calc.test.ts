import { StringCalculator } from "../index";
import logger from "../CalcLogger";

describe("Test for Add method", () => {
  let calculator: StringCalculator;

  beforeAll(() => {
    calculator = new StringCalculator(new logger());
    jest.spyOn(calculator, "Add");
    jest.spyOn(calculator.logger, "log");
  });
  it("Should return 100 for add(100)", () => {
    const sum = calculator.Add("100");
    expect(sum).toBe(100);
  });

  it("Should return 0 for add('')", () => {
    const sum = calculator.Add("");
    expect(sum).toBe(0);
  });
  it("Should return 3 for add(1,2)", () => {
    const sum = calculator.Add("1,2");
    expect(sum).toBe(3);
  });
  it("Should return 10 for add(1,2,3,4)", () => {
    const sum = calculator.Add("1,2,3,4");
    expect(sum).toBe(10);
  });

  it("Should return 7 for add(1/n2,4) with newline separator", () => {
    const sum = calculator.Add("1\n2,4");
    expect(sum).toBe(7);
  });
  it("Should return 7 for add(1/n2/n4) with newline separator", () => {
    const sum = calculator.Add("1\n2\n4");
    expect(sum).toBe(7);
  });
  it("Should return 3 for add(//;/n1;2) with custom separators", () => {
    const sum = calculator.Add("//;\n1;2");
    expect(sum).toBe(3);
  });
  it("Should return 3 for add(//$/n1$2) with custom separators", () => {
    const sum = calculator.Add("//$\n1$2");
    expect(sum).toBe(3);
  });
  it("Should return exception for add(1,-3) with negative number", () => {
    expect(() => calculator.Add("1,-3")).toThrow("negatives not allowed: -3");
  });
  it("Should return exception for add(1,-6,-2) with negative numbers", () => {
    expect(() => calculator.Add("1,-6,-2")).toThrow("negatives not allowed: -6");
  });
  it("Should return 11 for getCalledCount(add)", () => {
    const sum = calculator.getCalledCount("add");
    expect(sum).toBe(11);
    expect(calculator.Add).toHaveBeenCalledTimes(11);
  });
  it("Should return 10 for add(1,2,3,4,1001)", () => {
    const sum = calculator.Add("1,2,3,4,1001");
    expect(sum).toBe(10);
    expect(calculator.logger.log).toHaveBeenCalled()
  });
  it("Should return 1 for add(1,1001)", () => {
    const sum = calculator.Add("1,1001");
    expect(sum).toBe(1);
    expect(calculator.logger.log).toHaveBeenCalled()
  });
});
