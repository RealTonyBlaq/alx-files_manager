import MongoClient from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const client = MongoClient(`mongodb://${host}:${port}/${database}`);
  }

  isAlive() {

  }
}
