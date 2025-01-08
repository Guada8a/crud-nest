import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async checkDatabaseConnection() {
    try {
      const isConnected = this.dataSource.isInitialized;

      if (isConnected) {
        // Realizamos una consulta simple para verificar que podemos ejecutar queries
        await this.dataSource.query('SELECT 1');

        return {
          status: 'success',
          message: 'Conexión a la base de datos establecida correctamente',
          isConnected: true
        };
      }

      return {
        status: 'error',
        message: 'La base de datos no está inicializada',
        isConnected: false
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Error al conectar con la base de datos: ${error.message}`,
        isConnected: false
      };
    }
  }
}
