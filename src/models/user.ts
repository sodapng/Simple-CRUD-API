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
