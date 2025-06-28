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
import { TokenHelper } from '../../lib/helpers/token.helper';

@Controller('product')
export class ProductController {
  constructor(
    private readonly service: ProductService,
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
    const dto: CreateProductDto = JSON.parse(jsonData);
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
