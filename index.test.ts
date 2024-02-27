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

describe("Setting arrys", () => {
  const redis = new Redis();

  it("Successfully creates an array of strings", async () => {
    await redis.set("Names", ["Nathan", "James", "John", "Willow"]);
    const res = await redis.get("Names");
    expect(res).toEqual(["Nathan", "James", "John", "Willow"]);
  });

  it("Successfully overwrites an array of strings", async () => {
    await redis.set("Names", ["Nathan", "James", "John", "Willow"]);
    const res = await redis.get("Names");
    expect(res).toEqual(["Nathan", "James", "John", "Willow"]);

    await redis.set("Names", ["Johnny", "Jimmy"]);
    const res2 = await redis.get("Names");
    expect(res2).toEqual(["Johnny", "Jimmy"]);
  });

  it("Successfully creates an array of ints", async () => {
    await redis.set("Ages", [25, 33, 49, 10004]);
    const res = await redis.get("Ages");
    expect(res).toEqual([25, 33, 49, 10004]);
  });

  it("Successfully creates an array of floats", async () => {
    await redis.set("Stats", [20.01, 30.002, 14.7]);
    const res = await redis.get("Stats");
    expect(res).toEqual([20.01, 30.002, 14.7]);
  });

  it("Successfully creates an array of mixed values", async () => {
    await redis.set("me", ["Nathan", 27, 183.5]);
    const res = await redis.get("me");
    expect(res).toEqual(["Nathan", 27, 183.5]);
  });
});
