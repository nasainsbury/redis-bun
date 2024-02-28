import { describe, it, expect, afterAll } from "bun:test";
import Redis from "../index";

describe("redis.set()", () => {
  const redis = new Redis();

  afterAll(() => {
    redis.close();
  });

  it("string", async () => {
    await redis.set("Name", "nathan");
    const name = await redis.get("Name");
    expect(name).toEqual("nathan");
  });

  it("string - overrides", async () => {
    await redis.set("Name", "nathan");
    const name = await redis.get("Name");
    expect(name).toEqual("nathan");

    await redis.set("Name", "Willow");
    const name2 = await redis.get("Name");
    expect(name2).toEqual("Willow");
  });

  it("int", async () => {
    await redis.set("Age", 10);
    const age = await redis.get("Age");
    expect(age).toEqual(10);
  });

  it("array", async () => {
    await redis.set("Names", ["nathan", "james"]);
    const names = await redis.get("Names");
    expect(names).toEqual(["nathan", "james"]);
  });

  it("object", async () => {
    await redis.set("person", { name: "Nathan", friends: ["James", "John"] });
    const person = await redis.get("person");
    expect(person).toEqual({ name: "Nathan", friends: ["James", "John"] });
  });

  it("expiration works (cannot get)", async () => {
    await redis.set("Name", "Nathan", { expire: 1000 });
    const name = await redis.get("Name");
    expect(name).toEqual("Nathan");

    await Bun.sleep(1500);

    const name2 = await redis.get("Name");
    expect(name2).toEqual(undefined);
  });

  it("expiration works (can get)", async () => {
    await redis.set("House", "Big", { expire: 100000 });
    const house = await redis.get("House");
    expect(house).toEqual("Big");

    await Bun.sleep(1500);

    const house2 = await redis.get("House");
    expect(house2).toEqual("Big");
  });

  it("expiration (as string) works (cannot get)", async () => {
    await redis.set("Name", "Nathan", { expire: "1s" });
    const name = await redis.get("Name");
    expect(name).toEqual("Nathan");

    await Bun.sleep(2500);

    const name2 = await redis.get("Name");
    expect(name2).toEqual(undefined);
  });

  it("expiration (as string) works (can get)", async () => {
    await redis.set("House", "Big", { expire: "1m" });
    const house = await redis.get("House");
    expect(house).toEqual("Big");

    await Bun.sleep(1500);

    const house2 = await redis.get("House");
    expect(house2).toEqual("Big");
  });

  it("expiration asbolute works (cannot get)", async () => {
    const now = Math.floor(new Date().getTime() / 1000);
    await redis.set("Name", "Nathan", { expireAbs: now + 1 });
    const name = await redis.get("Name");
    expect(name).toEqual("Nathan");

    await Bun.sleep(2500);

    const name2 = await redis.get("Name");
    expect(name2).toEqual(undefined);
  });

  it("expiration asbolute works (can get)", async () => {
    const now = Math.floor(new Date().getTime() / 1000);
    await redis.set("House", "Big", { expireAbs: now + 5 });
    const house = await redis.get("House");
    expect(house).toEqual("Big");

    await Bun.sleep(1500);

    const house2 = await redis.get("House");
    expect(house2).toEqual("Big");
  });
});
