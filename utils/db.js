import pkg from 'mongodb';
import sha1 from 'sha1';

const { MongoClient } = pkg;

function hashPassword(password) {
  return sha1(password);
}

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
      this.users = this.db.collection('users');
      this.files = this.db.collection('files');
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
      return await this.users.countDocuments();
    } catch (err) {
      console.error('Failed to count users', err);
      return 0;
    }
  }

  async nbFiles() {
    try {
      return await this.files.countDocuments();
    } catch (err) {
      console.error('Failed to count files', err);
      return 0;
    }
  }

  async userExists(email) {
    try {
      const user = await this.users.findOne({ email });
      return user !== null;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async createUser(email, pwd) {
    if (!(await this.userExists(email))) {
      const password = hashPassword(pwd);
      await this.users.insertOne({ email, password });
      const user = await this.retrieveUser({ email });
      return user;
    }
    throw new Error(`User ${email} exists`);
  }

  async retrieveUser(obj) {
    const user = await this.users.findOne(obj);
    if (user !== null) return { id: user._id, email: user.email };
    throw new Error('User does not exist');
  }

  async updateUser(filter, update) {
    await this.retrieveUser(filter);
    await this.users.updateOne(filter, { $set: update });
  }
}

const dbClient = new DBClient();

export default dbClient;
