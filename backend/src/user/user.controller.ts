import { Body, Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserListResponseDto, UserResponseDto } from './user.dto';
import { UseGuards } from '@nestjs/common';
import { type Session } from '../types/auth';
import { CheckUserAccessGuard } from '../auth/guards/userAccess.guard';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { ParseUserIdPipe } from '../auth/pipes/parseUserId.pipe';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserListResponseDto> {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(CheckUserAccessGuard)
  async getUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<UserResponseDto> {
    const userId = id === 'me' ? user.id : id;
    return this.userService.getById(userId);
  }

  // @Post()
  // async createUser(
  //   @Body() createUserDto: CreateUserRequestDto,
  // ): Promise<UserResponseDto> {
  //   return this.userService.create(createUserDto);
  // }
}
