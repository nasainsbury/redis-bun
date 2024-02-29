# redis-bun

An attempt to make a bun-redis client that interfaces directly with redis via TCP.

This is just a fun project to learn more about:

- The redis protocol
- TCP and handling connections, data streams etc
- Bun!

To install dependencies:

```ts
async function main() {
  const redis = new Redis();

  await redis.set("name", "Nathan", { expire: "8h" });
  const name = await redis.get("name");
}
```
