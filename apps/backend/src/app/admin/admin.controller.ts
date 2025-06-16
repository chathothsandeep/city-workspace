import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from '../../guards/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoles } from '@city-workspace/common-utils';

@UseGuards(RolesGuard)
@Roles([UserRoles.ADMIN])
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() body: any) {
    const newUser = this.adminService.create();
    return newUser;
  }

  @Get()
  findAll(@Query() params: { [key: string]: any }) {
    return this.adminService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.adminService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
