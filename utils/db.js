import MongoClient from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    this.client = MongoClient(`mongodb://${host}:${port}`);
    this.client.connect()
  }

  isAlive() {

  }
}