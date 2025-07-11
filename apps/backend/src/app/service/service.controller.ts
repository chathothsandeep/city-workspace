import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenHelper } from '../../lib/helpers/token.helper';
import { ServiceService } from './service.service';
import {
  CreateServiceDto,
  UpdateServiceDto,
} from '@city-workspace/shared-models';

@Controller('service')
export class ServiceController {
  constructor(
    private readonly service: ServiceService,
    private readonly tokenService: TokenHelper,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body('data') jsonData: string,
    @UploadedFile() file: any,
    @Request() req,
  ) {
    const token = this.tokenService.getToken(req);
    const payload = this.tokenService.getPayload(token);
    const dto: CreateServiceDto = JSON.parse(jsonData);
    return this.service.create(dto, file, payload.id);
  }

  @Get()
  findAll(@Query() params: { [key: string]: any }) {
    return this.service.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.find(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() jsonData: string,
    @UploadedFile() file: any,
  ) {
    const updateServiceDto: UpdateServiceDto = JSON.parse(jsonData['data']);
    return this.service.update(id, updateServiceDto, file);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
