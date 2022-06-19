import cluster, { Worker } from 'cluster'
import { cpus } from 'os'
import { pid } from 'process'

void (async () => {
  if (cluster.isPrimary) {
    const numOfCpus = cpus().length

    console.log(`Master pid: ${pid}`)
    console.log(`Starting ${numOfCpus} forks`)
    const workers: Worker[] = []

    for (let i = 0; i < numOfCpus; i++) {
      const worker = cluster.fork()
      workers.push(worker)

      worker.on('message', ({ pid, users }) => {
        workers.forEach((el) => {
          !el.isDead() && el.process.pid !== pid && el.send(users)
        })
      })
    }
  } else {
    const id = cluster.worker?.id
    await import('./index')
    console.log(`Worker: ${id}, pid: ${pid}`)
  }
})()
