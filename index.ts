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

  public async type(key: string) {
    try {
      const res = await this.command(`TYPE ${key}\r\n`);
      return res[0];
    } catch {
      return null;
    }
  }
  public async get(key: string) {
    const type = await this.type(key);
    switch (type) {
      case "+string":
        return this.getString(key);
      case "+list":
        return this.getList(key);
      case "+hash":
        return this.getHash(key);
    }
    return null;
  }
  public async set(
    key: string,
    value: string | number | Array<string | number>
  ) {
    if (typeof value === "string" || typeof value === "number") {
      return await this.setString(key, value);
    }
    if (Array.isArray(value)) {
      return await this.setList(key, value);
    }
  }

  private async setString(key: string, value: string | number) {
    const res = await this.command(`SET ${key} ${value}\r\n`);

    return res[0] === "+OK";
  }
  private async setList(key: string, value: Array<number | string>) {
    const res = await this.command(
      `DEL ${key}\r\nRPUSH ${key} ${value.join(" ")}\r\n`
    );
    const amountAdded = Number(res[1][1]);
    return value.length === amountAdded;
  }
  private async getString(key: string) {
    const res = await this.command(`GET ${key}\r\n`);
    return Number(res[1]) || res[1];
  }
  private async getList(key: string) {
    const res = await this.command(`LRANGE ${key} 0 -1\r\n`);
    const arr = [];
    for (let i = 2; i < res.length; i += 2) {
      arr.push(Number(res[i]) || res[i]);
    }

    return arr;
  }
  private async getHash(key: string) {
    const res = await this.command(`HGETALL ${key}\r\n`);
    const obj = {};
    for (let i = 2; i < res.length - 2; i += 4) {
      const key = res[i];
      const value = Number(res[i + 2]) || res[i + 2];
      _.set(obj, key, value);
    }
    return obj;
  }
}

const redis = new Redis();

const obj = await redis.get("car3");
