import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')  // Asegúrate de que este nombre coincida con el de la tabla en la base de datos
export class Mensaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column({ default: true })
  activo: boolean;
}
