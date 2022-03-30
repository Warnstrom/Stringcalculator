const prompt = require("prompt-sync")();

enum constants {
  CUSTOM_NUMBER_LIMIT = 1000,
  CUSTOM_DELIMITER_BEGIN = "//",
  CUSTOM_DELIMITER_END = "\n",
}
export class logger {
  log(message: string | number): void {
    console.log(message);
  }
}
export class Scalc {
  private calledCount: { [key: string]: number } = { add: 0 };
  readonly logger: logger;
  constructor(logger: logger) {
    this.logger = logger;
  }
  Main() {
    this.logger.log("Welcome to scalc");
    this.logger.log(
      `Correct syntax for this program will be: (scalc 1,2,3), (“scalc //[***][%%%](newline)1***2%%%4")`
    );
    let string = "This is just a placeholder";
    do {
      const commandString = prompt("Waiting for command: ");
      string = commandString;
      this.Add(string.split(" ")[1]);
    } while (string.length != 0);
  }
  Add(numbersString: string): number {
    const validateCustomDelimiters: boolean = numbersString.startsWith(
      constants.CUSTOM_DELIMITER_BEGIN
    );
    this.calledCount["add"] += 1;
    if (numbersString.length === 0) return 0;
    if (numbersString.length === 1) return parseInt(numbersString);
    if (validateCustomDelimiters) {
      const delimiters: string = this.getCustomDelimiters(numbersString);
      console.log(delimiters);
      const numbers: number[] = numbersString
        .split(delimiters)
        .map((x: string) => parseInt(x))
        .filter((x: number) => x < constants.CUSTOM_NUMBER_LIMIT);
      const negatives = numbers.filter((x: number) => Math.sign(x) === -1);
      if (negatives.length) {
        throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
      } else {
        const sum = numbers.reduce((a: number, b: number) => a + b);
        this.logger.log(`The result is: ${sum}`);

        return sum;
      }
    } else {
      const numbers: number[] = numbersString.split(/[\n,]/).map(Number);
      for (const n of numbers) {
        if (n > constants.CUSTOM_NUMBER_LIMIT) {
          numbers.splice(numbers.indexOf(n), 1);
        }
      }
      const negatives = numbers.filter((x: number) => Math.sign(x) === -1);
      if (negatives.length) {
        throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
      } else {
        const sum = numbers.reduce((a: number, b: number) => a + b);
        this.logger.log(`The result is: ${sum}`);
        return sum;
      }
    }
  }

  getCalledCount(functionName: string): number {
    return this.calledCount[functionName];
  }
  getCustomDelimiters(numbers: string): string {
    console.log();
    if (numbers.includes("[") || numbers.includes("]")) {
      const str = numbers.split("//")[1].split("\\n")[0];
      const regex = new RegExp("([^(\\[|\\])]+)", "g").exec(str);
      return "";
    } else {
      return numbers.split("//")[1].split("\\n")[0];
    }
  }
}

const scalc = new Scalc(new logger());
scalc.Main();
