import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRoles } from '@city-workspace/common-utils';
import { UpdateUserDto } from '@city-workspace/shared-models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query('role') role?: UserRoles) {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id')
  updateFew(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateFew(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
