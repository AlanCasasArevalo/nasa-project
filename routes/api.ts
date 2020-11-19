import {Router} from '../dependencies/deps.ts'
import * as planets from '../models/planets.ts'
import * as launches from '../models/launches.ts'

const router = new Router()

router.get('/', (ctx) => {
  ctx.response.body = 'Mision a Jupiter'
})

router.get('/planets', (ctx) => {
  // ctx.throw(501, 'Sorry planets are not presented yet')
  ctx.response.body = planets.getAllPlanets()
})

router.get('/launches', (ctx) => {
  ctx.response.body = launches.getAllLaunches()
})

router.get('/launches/:id', (ctx) => {
  const id = Number(ctx.params?.id)
  if (id) {
    const launch = launches.getLaunchesById(id)
    if (launch) {
      ctx.response.body = launch
    } else {
      ctx.throw(400, 'Launch with that ID does not exists')
    }
  } else {
    ctx.throw(404)
  }
})

router.post('/launches', async (ctx) => {
  const body = await ctx.request.body()
  const value = await body.value

  await launches.addNewLaunch(value)
  ctx.response.body = {
    success: true
  }
  ctx.response.status = 201
})

router.delete('/launches/:id', (ctx) => {
  const id = Number(ctx.params?.id)
  if (id) {
    const abortedLaunch = launches.deleteLaunchesById(id)
    if (abortedLaunch) {
      ctx.response.body = {
        success: abortedLaunch
      }
      //ctx.response.status = 204
    } else {
      ctx.throw(400, 'Launch with that ID does not exists')
    }
  } else {
    ctx.throw(404)
  }
})

export default router