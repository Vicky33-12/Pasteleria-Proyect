import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { PaginationDto } from 'src/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MovimientoService extends PrismaClient implements OnModuleInit
{
  private readonly logger =new Logger(`MovimientoService`)
  onModuleInit() {
    this.$connect();
    this.logger.log('Base de datos conectada');
  }

  create(createMovimientoDto: CreateMovimientoDto) {
    return this.movimiento.create({
      data:createMovimientoDto
    });
  }

  async findAll(paginationDto:PaginationDto) {
    const {page, limit}=paginationDto;
    const totalPages =await this.movimiento.count({where:{available:true}});
    const lastPage= Math.ceil(totalPages/limit);

    if(page>lastPage){
      throw new NotFoundException(`La página #${page} no ha sido encontrada`);
    }

    return{
      data: await this.movimiento.findMany({
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

  findOne(id: number) {
    return `This action returns a #${id} movimiento`;
  }

  update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    return `This action updates a #${id} movimiento`;
  }

  async remove(id: number) {
    await this.findOne(id);
    const producto= await this.movimiento.update({
      where:{id},
      data:{
        available:false
      }
    })
  }
}
