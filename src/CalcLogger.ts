export default class CalcLogger implements Ilogger {
  log(message: string | number): void {
    const date = new Date();
    console.info(date.toTimeString().split(" ")[0], "-", message);
  }
}
