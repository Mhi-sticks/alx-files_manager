// Database client class for MongoDB
import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const db = process.env.DV_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${db}`;
    this.client = new MongoClient(uri);
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    this.db = this.client.db();
    this.users = this.db.collection('users');
    const userNum = await this.users.countDocuments();
    return userNum;
  }

  async nbFiles() {
    this.db = this.client.db();
    this.files = this.db.collection('files');
    const fileNum = await this.files.countDocuments();
    return fileNum;
  }

  async saveUser(email, passwd) {
    this.db = this.client.db();
    this.users = this.db.collection('users');
    const user = await this.users.insert(email, password: passwd);
    return user;
  }
}

const dbClient = new DBClient();
export default dbClient;
