import { validate, version } from 'uuid'

export function isUUID(id: string) {
  return validate(id) && version(id) === 4
}
