import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  //@Post()
  @MessagePattern({cmd:'create_inventario'})
  create(@Payload() createInventarioDto: CreateInventarioDto) {
    return this.inventarioService.create(createInventarioDto);
  }

  //@Get()
  @MessagePattern({cmd:'findall_inventario'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.inventarioService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({cmd:'findone_inventario'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.inventarioService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd:'update_inventario'})
  update(@Payload() updateInventarioDto: UpdateInventarioDto) {
    return this.inventarioService.update(updateInventarioDto.id, updateInventarioDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd:'delete_inventario'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.inventarioService.remove(id);
  }
}
