import {
  Body,
  Controller,
  Get,
  Param,
  UseInterceptors,
  Post,
  Patch,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserListResponseDto,
  PublicUserResponseDto,
  RegisterUserRequestDto,
  UpdateUserRequestDto,
} from './user.dto';
import { UseGuards } from '@nestjs/common';
import { type Session } from '../types/auth';
import { CheckUserAccessGuard } from '../auth/guards/userAccess.guard';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { ParseUserIdPipe } from '../auth/pipes/parseUserId.pipe';
import { AuthService } from '../auth/auth.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AuthDelayInterceptor } from '../auth/interceptors/authDelay.interceptor';
import { LoginResponseDto } from '../session/session.dto';
import { Public } from '../auth/decorators/public.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

class ToggleFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  itemId: number;
}

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Patch('me/favorites/driver')
  @UseGuards(AuthGuard)
  async toggleFavoriteDriver(
    @CurrentUser() user: { id: number },
    @Body() { itemId }: ToggleFavoriteDto,
  ): Promise<PublicUserResponseDto> {
    const userId = user.id;
    const newStatus = await this.userService.toggleFavoriteDriver(
      userId,
      itemId,
    );
    return newStatus;
  }

  @Patch('me/favorites/track')
  @UseGuards(AuthGuard)
  async toggleFavoriteTrack(
    @CurrentUser() user: { id: number }, // Haal de ingelogde user ID op
    @Body() { itemId }: ToggleFavoriteDto,
  ): Promise<PublicUserResponseDto> {
    const userId = user.id;
    const newStatus = await this.userService.toggleFavoriteTrack(
      userId,
      itemId,
    );
    return newStatus;
  }

  @Get()
  @UseGuards(AdminGuard)
  async getAllUsers(): Promise<UserListResponseDto> {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(CheckUserAccessGuard)
  async getUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<PublicUserResponseDto> {
    const userId = id === 'me' ? Number(user.id) : id;
    return this.userService.getById(userId);
  }

  // @Post()
  // async createUser(
  //   @Body() createUserDto: CreateUserRequestDto,
  // ): Promise<UserResponseDto> {
  //   return this.userService.create(createUserDto);
  // }

  @Post()
  @Public()
  @UseInterceptors(AuthDelayInterceptor)
  async registerUser(
    @Body() registerDto: RegisterUserRequestDto,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.register(registerDto);
    return { token };
  }

  @Put(':id')
  @UseGuards(CheckUserAccessGuard)
  async updateUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    return await this.userService.updateById(id === 'me' ? user.id : id, dto);
  }

  @Patch(':id')
  @UseGuards(CheckUserAccessGuard)
  async patchUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    console.log('PATCH route hit with id:', id, 'user:', user, 'dto:', dto);
    return await this.userService.updateById(id === 'me' ? user.id : id, dto);
  }

  @Delete(':id')
  @UseGuards(CheckUserAccessGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<void> {
    return await this.userService.deleteById(id === 'me' ? user.id : id);
  }
}
