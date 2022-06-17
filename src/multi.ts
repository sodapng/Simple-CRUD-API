import cluster from 'cluster'
import { cpus } from 'os'
import { pid } from 'process'

void (async () => {
  if (cluster.isPrimary) {
    const numOfCpus = cpus().length

    console.log(`Master pid: ${pid}`)
    console.log(`Starting ${numOfCpus} forks`)

    for (let i = 0; i < numOfCpus; i++) cluster.fork()
  } else {
    const id = cluster.worker?.id
    await import('./index')
    console.log(`Worker: ${id}, pid: ${pid}`)
  }
})()
