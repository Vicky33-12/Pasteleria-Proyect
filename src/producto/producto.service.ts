import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginationDto } from 'src/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductoService extends PrismaClient implements OnModuleInit {
  
  private readonly logger = new Logger('ProductoService')

  onModuleInit() {
    this.$connect();
    this.logger.log('Base de datos Conectada');

  }
  create(createProductoDto: CreateProductoDto) {
    return this.producto.create({
      data:createProductoDto
    });
    //return createProductDto;
  }

  async findAll(paginationDto:PaginationDto) {
    const {page, limit} = paginationDto;
    const totalPages = await this.producto.count({where:{available:true}});
    const lastPage = Math.ceil(totalPages/limit);

    if(page>lastPage)
    {
      throw new NotFoundException (`La pagina #${page} no ha sido encontrada`);
    }

    return {
      data : await this.producto.findMany({
        skip:(page-1)*limit,
        take:limit,
        where:{available:true}
      }),
      meta:{
        total:totalPages,
        page:page,
        lastPage:lastPage,
      }

    }

  }

  async findOne(id: number) {
    const producto = await this.producto.findFirst({where:{id, available:true}})
    if(!producto){
      throw new NotFoundException (`Producto con ID #${id} no ha sido encontrado`)
    } 

    return producto
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const {id:__,...data}=updateProductoDto;
    await this.findOne(id);
    return this.producto.update({
      where:{id},
      data:data,

    })
  }

  async remove(id: number) {
    await this.findOne(id);

    const producto = await this.producto.update({
      where:{id},
      data:{
        available:false
      }
    })
    return producto;
  }
}
