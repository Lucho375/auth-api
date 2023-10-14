import { MongooseDatabase } from './data/mongooseDatabase.js'
import { AppRouter } from './presentation/routes.js'
import { Server } from './presentation/server.js'
import { envs } from './config/index.js'
;(() => {
  void Main()
})()

async function Main(): Promise<void> {
  try {
    const server = new Server({ port: envs.PORT, routes: AppRouter.routes })
    const database = new MongooseDatabase(envs.DB_URI)
    await database.connect()
    server.listen()
  } catch (error) {
    console.log(error)
  }
}
