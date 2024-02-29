# redis-bun

An attempt to make a bun-redis client that interfaces directly with redis via TCP.

```ts
async function main() {
  const redis = new Redis();

  await redis.set("name", "Nathan", { expire: "8h" });
  const name = await redis.get("name");
}
```

```ts
async function main() {
  const redis = new Redis();

  const now = new Date().getTime() / 1000;
  const tomorrow = now + 60 * 60 * 24;

  await redis.set("name", "Nathan", { expireAbs: tomorrow });
  const name = await redis.get("name");
}
```
