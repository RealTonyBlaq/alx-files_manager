import MongoClient from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    this.client = new MongoClient(`mongodb://${host}:${port}`);

    this.clientConnect.bind(this);
  }

  async clientConnect() {
    try {
      await this.client.connect();
      this.connected = true;
    } catch (err) {
      console.log(err);
      this.connected = false;
    }
  }

  isAlive() {
    return this.connected;
  }
}
