import { describe, it, expect } from "bun:test";
import Redis from "./";

describe("redis.set()", () => {
  const redis = new Redis();

  it("string", async () => {
    await redis.set("Name", "nathan");
    const name = await redis.get("Name");
    expect(name).toEqual("nathan");
  })

  it("string - overrides", async () => {
    await redis.set("Name", "nathan");
    const name = await redis.get("Name");
    expect(name).toEqual("nathan");

    await redis.set("Name", "Willow");
    const name2 = await redis.get("Name");
    expect(name2).toEqual("Willow");
  })

  it("int", async () => {
    await redis.set("Age", 10);
    const age = await redis.get("Age");
    expect(age).toEqual(10);
  })

  it("array", async () => {
    await redis.set("Names", ["nathan", "james"]);
    const names = await redis.get("Names");
    expect(names).toEqual(["nathan", "james"]);
  })

  it("object", async () => {
    await redis.set("person", { name: "Nathan", friends: ["James", "John"] });
    const person = await redis.get("person");
    expect(person).toEqual({ name: "Nathan", friends: ["James", "John"] });
  })
})
