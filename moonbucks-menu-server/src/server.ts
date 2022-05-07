import Koa from 'koa'
import KoaLogger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { MenuRouter } from './menu'

const app = new Koa()

const PORT = 4000

app.use(bodyParser())
app.use(
  cors({
    origin: '*',
  })
)
app.use(KoaLogger())

app.use(MenuRouter.routes())

app
  .listen(PORT, async () => {
    console.log(`Server listening http://localhost:${PORT}`)
  })
  .on('error', (err) => {
    console.error(err)
  })
