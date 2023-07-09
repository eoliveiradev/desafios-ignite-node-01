import { Connection, createConnection } from "typeorm";

export class TestDB {
  private connection: Connection

  async init() {
    this.connection = await createConnection()

    if (!this.connection.isConnected) {
      await this.connection.connect()
    };

    await this.connection.dropDatabase()
    await this.connection.runMigrations()
  }

  async end() {
    if (!this.connection?.isConnected) {
      await this.connection.connect()
    };

    await this.connection.dropDatabase()
    await this.connection.close()
  }
}

