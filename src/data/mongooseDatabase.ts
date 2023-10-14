import mongoose from 'mongoose'

export class MongooseDatabase {
  private connection!: typeof mongoose
  constructor(private readonly uri: string) {}

  async connect(): Promise<void> {
    this.connection = await mongoose.connect(this.uri, {})
    console.log('Mongoose connected')
  }

  async disconnect(): Promise<void> {
    await this.connection?.disconnect()
    console.log('Mongoose disconnected')
  }
}
