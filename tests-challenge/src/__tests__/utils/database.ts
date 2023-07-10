import { Connection, createConnection } from "typeorm";

export class TestDB {
  private connection: Connection

  async init() {
    this.connection = await createConnection()
    await this.connection.dropDatabase()
    await this.connection.runMigrations()
  }

  async clear() {
    if (!this.connection?.isConnected) return;

    await this.connection.dropDatabase()
  }

  async end() {
    if (!this.connection?.isConnected) return;

    await this.connection.dropDatabase()
    await this.connection.close()
  }
}

