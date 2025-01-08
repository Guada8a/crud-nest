import { Controller, Get, Param } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { AppService } from './app.service';
import { ResponseUtil } from './utils/response.util';
import { ApiTags } from '@nestjs/swagger';
import { ApiCustomResponses } from './utils/customResponses.decorator';

@ApiTags('Mensajes')
@Controller('v1')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiCustomResponses({
    summary: 'Obtener mensaje de saludo',
    successExample: {
      message: 'Hello World!',
      error: false,
      statusCode: 200,
    },
  })
  @Get('hello')
  getHello() {
    try {
      const message = this.appService.getHello();
      return ResponseUtil.success(message);
    } catch (error) {
      return ResponseUtil.internalServerError('Error al obtener el saludo');
    }
  }

  @ApiCustomResponses({
    summary: 'Obtener mensaje de despedida',
    successExample: {
      message: 'Goodbye!',
      error: false,
      statusCode: 200,
    },
  })
  @Get('bye')
  getBye() {
    try {
      const message = this.appService.getBye();
      return ResponseUtil.success(message);
    } catch (error) {
      return ResponseUtil.internalServerError('Error al obtener la despedida');
    }
  }

  @ApiCustomResponses({
    summary: 'Obtener mensaje por ID',
    successExample: {
      message: 'This is the hello message with id 1',
      error: false,
      statusCode: 200,
    },
  })
  @Get('message/:id')
  getHelloById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          ResponseUtil.badRequest('El ID debe ser un número'),
      })
    )
    id: number
  ) {
    if (id <= 0) {
      return ResponseUtil.badRequest('El ID debe ser un número positivo');
    }
    return ResponseUtil.success(`This is the hello message with id ${id}`);
  }

  @ApiCustomResponses({
    summary: 'Obtener lista de mensajes',
    successExample: {
      message: 'Lista de mensajes obtenida exitosamente',
      data: [
        { id: 1, nombre: 'Juan Perez', correo: 'juan@example.com' },
      ],
      error: false,
      statusCode: 200,
    },
  })
  @Get('messages')
  async getMessages() {
    try {
      const messages = await this.appService.getMessages();  // Llamar al servicio para obtener los mensajes
      return ResponseUtil.success('Lista de mensajes obtenida exitosamente', messages);
    } catch (error) {
      return ResponseUtil.internalServerError('Error al obtener la lista de mensajes');
    }
  }

  @ApiCustomResponses({
    summary: 'Obtener mensaje por ID',
    successExample: {
      message: 'Mensaje con id 1 obtenido exitosamente',
      error: false,
      statusCode: 200,
    },
  })
  @Get('message/:id')
  async getMessageById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          ResponseUtil.badRequest('El ID debe ser un número'),
      }),
    )
    id: number,
  ) {
    if (id <= 0) {
      return ResponseUtil.badRequest('El ID debe ser un número positivo');
    }
    try {
      const message = await this.appService.getMessageById(id);  // Llamar al servicio para obtener el mensaje por ID
      if (!message) {
        return ResponseUtil.notFound(`Mensaje con id ${id} no encontrado`);
      }
      return ResponseUtil.success(`Mensaje con id ${id} obtenido exitosamente`, message);
    } catch (error) {
      return ResponseUtil.internalServerError(`Error al obtener el mensaje con id ${id}`);
    }
  }

  @Get('health')
  async checkDatabaseConnection() {
    return await this.appService.checkDatabaseConnection();
  }
}
