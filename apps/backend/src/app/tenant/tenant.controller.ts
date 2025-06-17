import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import {
  CreateTenantDto,
  UpdateTenantDto,
} from '@city-workspace/shared-models';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body('data') jsonData: string, @UploadedFile() file: any) {
    const createTenantDto: CreateTenantDto = JSON.parse(jsonData);
    return this.tenantService.create(createTenantDto, file);
  }

  @Get()
  findAll(@Query() params: { [key: string]: any }) {
    return this.tenantService.findAll(params);
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.tenantService.find(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTenantDto) {
    return this.tenantService.update(id, data);
  }

  @Patch(':id')
  updateFew(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTenantDto,
  ) {
    return this.tenantService.updateFew(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tenantService.delete(id);
  }
}
