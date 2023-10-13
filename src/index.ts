import { AppRouter } from './presentation/routes.js'
import { Server } from './presentation/server.js'
;(() => {
  Main()
})()

function Main() {
  const server = new Server({ port: 8080, routes: AppRouter.routes })
  server.listen()
}
