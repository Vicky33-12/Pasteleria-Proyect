import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Controller('movimiento')
export class MovimientoController {
  constructor(private readonly movimientoService: MovimientoService) {}

  //@Post()
  @MessagePattern({cmd:'create_movimiento'})
  create(@Payload() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientoService.create(createMovimientoDto);
  }

  //@Get()
  @MessagePattern({cmd:'findall_movimientos'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.movimientoService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({cmd:'findone_movimiento'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.movimientoService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd:'update_movimiento'})
  update(@Payload() updateMovimientoDto: UpdateMovimientoDto) {
    return this.movimientoService.update(updateMovimientoDto.id, updateMovimientoDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd:'delete_movimiento'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.movimientoService.remove(id);
  }
}
