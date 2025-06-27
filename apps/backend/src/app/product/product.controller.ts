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
import { ProductService } from './product.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@city-workspace/shared-models';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../auth/auth.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly authService: AuthService,
  ) {}

  // TODO: neet to check userId and token by using auth service
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body('data') jsonData: string,
    @UploadedFile() file: any,
    @Request() req,
  ) {
    const token = this.authService.getToken(req);
    const payload = this.authService.getPayload(token);
    const dto: CreateProductDto = JSON.parse(jsonData);
    return this.service.create(dto, file);
  }

  @Get()
  findAll(@Query() params: { [key: string]: any }, @Request() req) {
    const token = this.authService.getToken(req);
    const payload = this.authService.getPayload(token);
    return this.service.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.find(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.service.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
