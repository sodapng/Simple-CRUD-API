import users from '../data/user.json'

export interface IUser {
  id: string
  username: string
  age: number
  hobbies: string[] | []
}

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
