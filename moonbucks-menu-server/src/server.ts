import Koa from 'koa'
import KoaLogger from "koa-logger";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import Router from "koa-router";

const app = new Koa()

const PORT = 3005

app.use(bodyParser())
app.use(cors({
  origin: '*'
}))
app.use(KoaLogger())

const router = new Router()
router.get('/api', async (ctx) => {
  try {
    ctx.body = {
      status: 'success'
    }
  } catch (e) {
    console.error(e)
  }
})

app.use(router.routes())

app.listen(PORT, async () => {
  console.log(`Server listening http://localhost:${PORT}`)
}).on('error', (err) => {
  console.error(err)
})