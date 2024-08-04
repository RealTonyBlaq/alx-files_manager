import pkg from 'mongodb';

const { MongoClient } = pkg;

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.dbName = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}`;
    this.client = MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.connected = false;

    this.clientConnect();
  }

  async clientConnect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.connected = true;
    } catch (err) {
      console.error('Failed to connect to the database', err);
      this.connected = false;
    }
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error('Failed to count users', err);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error('Failed to count files', err);
      return 0;
    }
  }
}

const dbClient = new DBClient();

export default dbClient;
