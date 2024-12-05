import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { InventarioModule } from './inventario/inventario.module';
import { MovimientoModule } from './movimiento/movimiento.module';
import { ProveedorModule } from './proveedor/proveedor.module';

@Module({
  imports: [ProductoModule, InventarioModule, MovimientoModule, ProveedorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
