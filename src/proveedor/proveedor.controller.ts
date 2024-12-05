import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

   //@Post()
   @MessagePattern({cmd:'create_proveedor'})
   create(@Payload() createProveedorDto: CreateProveedorDto) {
     return this.proveedorService.create(createProveedorDto);
   }
 
   //@Get()
   @MessagePattern({cmd:'findall_proveedor'})
   findAll(@Payload() paginationDto: PaginationDto) {
     return this.proveedorService.findAll(paginationDto);
   }
 
   //@Get(':id')
   @MessagePattern({cmd:'findone_proveedor'})
   findOne(@Payload('id', ParseIntPipe) id: number) {
     return this.proveedorService.findOne(id);
   }
 
   //@Patch(':id')
   @MessagePattern({cmd:'update_proveedor'})
   update(@Payload() updateProveedorDto: UpdateProveedorDto) {
     return this.proveedorService.update(updateProveedorDto.id, updateProveedorDto);
   }
 
   //@Delete(':id')
   @MessagePattern({cmd:'delete_proveedor'})
   remove(@Payload('id', ParseIntPipe) id: number) {
     return this.proveedorService.remove(id);
   }
}
