import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Mensaje } from './mensaje.entity';  // Asegúrate de importar la entidad

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Mensaje) private mensajeRepository: Repository<Mensaje>,  // Inyectar el repositorio
    @InjectDataSource() private dataSource: DataSource
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  getBye(): string {
    return 'Goodbye!';
  }

  async getMessages(): Promise<Mensaje[]> {
    try {
      return await this.mensajeRepository.find();
    } catch (error) {
      throw new Error('Error al obtener los mensajes');
    }
  }

  async getMessageById(id: number): Promise<Mensaje> {
    try {
      return await this.mensajeRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(`Error al obtener el mensaje con id ${id}`);
    }
  }

  async checkDatabaseConnection() {
    try {
      const isConnected = this.dataSource.isInitialized;

      if (isConnected) {
        await this.dataSource.query('SELECT 1');
        return {
          status: 'success',
          message: 'Conexión a la base de datos establecida correctamente',
          isConnected: true,
          database: this.dataSource.options.database,
          version: this.dataSource.driver.version
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
