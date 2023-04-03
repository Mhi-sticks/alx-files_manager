import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', err => console.log(err));
  }

  async isAlive() {
   this.client.on('ready', (err) => {
     if (err) return false;
     return true
   }); 
  }
  async get(key) {
    const getValue = promisify(this.client.get).bind(this.client);
    try {
      return await getValue(key);
    } catch(err) {
      return (err.message);
    }
  }
  async set(key, value, duration) {
    await this.client.setex(key, duration, value);
  }
  async del(key) {
    await this.client.del(key, (err, reply) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Deleted ${reply} keys`);
      }
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
