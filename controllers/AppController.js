// controller routes
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  // appcontroller class
  static getStatus(req, res) {
    const redisLive = redisClient.isAlive();
    const dbLive = dbClient.isAlive();
    res.status(200).json({ redis: redisLive, db: dbLive });
  }

  static async getStats(req, res) {
    const userCount = dbClient.nbUsers();
    const fileCount = dbClient.nbFiles();
    res.status(200).json({ users: userCount, files: fileCount });
  }
}

export default AppController;
