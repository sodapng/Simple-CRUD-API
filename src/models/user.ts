import { v4 as uuidv4 } from 'uuid'

export interface IUser {
  id?: string
  username: string
  age: number
  hobbies: string[] | []
}

const users: IUser[] = []

export function findAll(): Promise<IUser[]> {
  return new Promise((resolve) => {
    resolve(users)
  })
}

export function findById(id: string): Promise<IUser | undefined> {
  return new Promise((resolve) => {
    const foundUser = users.find((user) => user.id === id)
    resolve(foundUser)
  })
}

export function create(rawUser: IUser): Promise<IUser> {
  return new Promise((resolve) => {
    const createdNewUser = { id: uuidv4(), ...rawUser }
    users.push(createdNewUser)
    resolve(createdNewUser)
  })
}

export function update(id: string, rawUser: IUser): Promise<IUser> {
  return new Promise((resolve) => {
    const index = users.findIndex((user) => user.id === id)
    users[index] = { id, ...rawUser }
    resolve(users[index])
  })
}
