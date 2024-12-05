import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { PaginationDto } from 'src/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class InventarioService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('InventarioService')

  onModuleInit() {
    this.$connect();
    this.logger.log('Base de datos conectada');
  }

  create(createInventarioDto: CreateInventarioDto) {
    return this.inventario.create({
      data:createInventarioDto
    });
  }

 async  findAll(paginationDto:PaginationDto) {
  const {page, limit} = paginationDto;
  const totalPages = await this.inventario.count({where:{available:true}});
  const lastPage = Math.ceil(totalPages/limit);

  if(page>lastPage){
    throw new NotFoundException(`La página #${page} no ha sido encontrada`);
  }
    return {
      data: await this.inventario.findMany({
        skip:(page-1)*limit,
        take:limit,
        where:{
          available:true
        }
      }),
      meta:{
        total:totalPages,
        page:page,
        lastPage:lastPage
      }
    }
  }

  async findOne(id: number) {
    const producto=await this.inventario.findFirst({where:{id,available:true}})
    if(!producto){
      throw new NotFoundException(`Producto con ID #${id} no ha sido encontrado`);
    }
    return producto;
  }

  async update(id: number, updateInventarioDto: UpdateInventarioDto) {
    const {id:__,...data}=updateInventarioDto;
    await this.findOne(id);
    return this.inventario.update({
      where:{id},
      data:data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    const producto= await this.inventario.update({
      where:{id},
      data:{
        available:false
      }
    })
    
  }
}
