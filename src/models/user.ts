import _users from '../../data/user.json'
import { v4 as uuidv4 } from 'uuid'
import { writeDataToFile } from '../helpers/writeDataToFile'

export interface IUser {
  id?: string
  username: string
  age: number
  hobbies: string[] | []
}

const users: IUser[] = _users

export function findAll(): Promise<IUser[]> {
  return new Promise((resolve) => {
    resolve(users)
  })
}

export function findById(id: string): Promise<IUser | undefined> {
  return new Promise((resolve) => {
    const user = users.find((user) => user.id === id)
    resolve(user)
  })
}

export function create(user: IUser): Promise<IUser> {
  return new Promise((resolve) => {
    const newUser = { id: uuidv4(), ...user }
    users.push(newUser)
    writeDataToFile('./data/user.json', users)
    resolve(newUser)
  })
}
