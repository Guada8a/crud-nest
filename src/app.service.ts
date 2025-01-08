import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './mensaje.entity';  // Asegúrate de importar la entidad

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Mensaje) private mensajeRepository: Repository<Mensaje>,  // Inyectar el repositorio
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
}
