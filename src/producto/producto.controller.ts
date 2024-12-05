import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  //@Post()
  @MessagePattern({cmd:'create_producto'})
  create(@Payload() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  //@Get()
  @MessagePattern({cmd:'findall_productos'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productoService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({cmd:'findone_productos'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productoService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd:'update_productos'})
  update(@Payload() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(updateProductoDto.id, updateProductoDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd:'delete_productos'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productoService.remove(id);
  }
}
