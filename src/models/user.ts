import { v4 as uuidv4 } from 'uuid'

export interface IUser {
  id?: string
  username: string
  age: number
  hobbies: string[] | []
}

let users: IUser[] = []

process.on('message', (msg: any) => {
  users = msg
})

export function findAll(): Promise<IUser[]> {
  return new Promise((resolve) => {
    process.send?.(users)
    resolve(users)
  })
}

export function findById(id: string): Promise<IUser | undefined> {
  return new Promise((resolve) => {
    const foundUser = users.find((user) => user.id === id)
    process.send?.(users)
    resolve(foundUser)
  })
}

export function create(rawUser: IUser): Promise<IUser> {
  return new Promise((resolve) => {
    const createdNewUser = { id: uuidv4(), ...rawUser }
    users.push(createdNewUser)
    process.send?.(users)
    resolve(createdNewUser)
  })
}

export function updateById(id: string, rawUser: IUser): Promise<IUser> {
  return new Promise((resolve) => {
    const index = users.findIndex((user) => user.id === id)
    users[index] = { id, ...rawUser }
    process.send?.(users)
    resolve(users[index])
  })
}

export function deleteById(id: string): Promise<true> {
  return new Promise((resolve) => {
    users = users.filter((user) => user.id !== id)
    process.send?.(users)
    resolve(true)
  })
}
