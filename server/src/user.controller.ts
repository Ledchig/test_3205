import { Controller, Get, Query, UnprocessableEntityException } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.interface'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('api/users')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers()
  }

  @Get('api/find-users')
  async search(@Query('email') email: string, @Query('number') number?: string): Promise<User[]> {
    if (!email) {
      throw new UnprocessableEntityException('Email is required')
    }

    return this.userService.findUsers(email, number)
  }
}
