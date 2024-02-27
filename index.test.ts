import { describe, it, expect } from "bun:test";
import Redis from "./";

describe("Setting strings", () => {
  const redis = new Redis();
  it("Successfully sets a value", async () => {
    await redis.set("Name", "Nathan");
    const res = await redis.get("Name");
    expect(res).toEqual("Nathan");
  });

  it("Successfully overrides a value", async () => {
    await redis.set("Name", "Nathan");
    const res = await redis.get("Name");
    expect(res).toEqual("Nathan");

    await redis.set("Name", "Joe");
    const res2 = await redis.get("Name");
    expect(res2).toEqual("Joe");
  });

  it("Successfully retrieves what should be an int", async () => {
    await redis.set("Age", 10);
    const res = await redis.get("Age");
    expect(res).toEqual(10);
  });

  it("Successfully retrieves what should be a float", async () => {
    await redis.set("Height", 139.4);
    const res = await redis.get("Height");
    expect(res).toEqual(139.4);
  });
});
