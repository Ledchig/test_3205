import * as fs from 'fs'
import * as path from 'path'
import { Injectable } from '@nestjs/common'
import { User } from './user.interface'

@Injectable()
export class UserService {
  private users: Array<User>

  constructor() {
    const filePath = path.resolve(__dirname, '..', 'data', 'users.json')
    const data = fs.readFileSync(filePath, 'utf8')
    this.users = JSON.parse(data)
  }

  private delay(ms = 5000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getUsers(): Promise<User[]> {
    await this.delay()
    return this.users
  }

  async findUsers(email: string, number?: string): Promise<User[]> {
    await this.delay()

    const filteredEmails = this.users.filter((user) => user.email === email)

    if (number) {
      const filterednumber = filteredEmails.filter((user) => user.number === number)

      return filterednumber
    }

    return filteredEmails
  }
}
