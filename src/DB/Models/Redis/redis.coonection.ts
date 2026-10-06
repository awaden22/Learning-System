import { createClient } from 'redis';
import { REDIS_URL } from "../../../config/config.service.js";


export const client = createClient({
  url: REDIS_URL,
});

 async function testRedisConnection() {
  try {
    if (!client.isOpen) {
      await client.connect();
      console.log("connection redis");
    }
  } catch (err) {
    console.log("Error connection to redis", err);
  }
}

export default testRedisConnection