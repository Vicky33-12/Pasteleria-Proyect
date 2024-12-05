import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { PaginationDto } from 'src/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProveedorService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProveedorServise')

  onModuleInit() {
    this.$connect();
    this.logger.log(`Base de datos conectada`);
  }

  create(createProveedorDto: CreateProveedorDto){
    return this.proveedor.create({
      data:createProveedorDto
    });
  }

  async findAll(paginationDto:PaginationDto) {
    const{page, limit}=paginationDto;
    const totalPages = await this.proveedor.count({where:{available:true}});
    const lastPage = Math.ceil(totalPages/limit);

    if(page>lastPage){
      throw new NotFoundException(`La página # ${page} no se encontró`);
    }

    return {
      data: await this.proveedor.findMany({
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
      const producto = await this.proveedor.findFirst({where:{id, available :true}})
    if(!producto){
      throw new NotFoundException(`Producto con id#${id} no encontrado`);
    }
    return producto
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto) {
    const {id:__,...data}=updateProveedorDto;
    await this.findOne(id);
    return this.proveedor.update({
      where:{id},
      data:data,
    })
  }

 async remove(id: number) {
  await this.findOne(id);
   const producto =await this.producto.update({
     where:{id},
     data:{
       available:false
     }
   }) 
  }
}
