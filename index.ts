import * as net from "net";
import _ from "lodash";

export default class Redis {
  private client = net.createConnection(6379, "127.0.0.1");
  private acc = 0;

  constructor() {}

  /**
   * @TODO: has to be a better way of determining which response matches which request.
   */
  private async command(command: string) {
    return new Promise<string[]>((resolve, reject) => {
      const id = this.acc++;
      this.client.write(`echo ${id}\r\n${command}`, (err) => {
        if (err) {
          console.error("COOL", err);
          reject(err);
        }
      });
      this.client.on("data", (data) => {
        const responseArr = data.toString().split("\r\n");
        const responseId = Number(responseArr[1]);
        if (responseId === id) {
          resolve(responseArr.slice(2, -1));
        }
      });
    });
  }

  private format(value: string) {
    try {
      return JSON.parse(value)
    } catch {
      return value;
    }
  }

  public async get(key: string) {
    const res = await this.command(`GET ${key}\r\n`);
    return this.format(res[1])
  }
  public async set(
    key: string,
    value: string | number | Array<string | number> | Record<string, unknown>
  ) {
    if (typeof value === "object") {
      await this.command(`SET ${key} "${JSON.stringify(value).replace(/"/g, '\\"')}"\r\n`);
    } else {
      await this.command(`SET ${key} ${value}\r\n`);
    }
  }
}
