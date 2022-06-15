import { writeFile } from 'fs/promises'
import { IUser } from '../models/user'

export async function writeDataToFile(fileToPath: string, content: IUser[]) {
  try {
    await writeFile(fileToPath, JSON.stringify(content))
  } catch (error) {
    console.error(error)
  }
}
