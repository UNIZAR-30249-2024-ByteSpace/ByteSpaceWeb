import { Space } from './model';

export interface ISpaceRepo {
  // Las operaciones que te marque Rael
  getAllSpaces(): Promise<Space[]>; // Todos los espacios reservables
  getSpaceById(id: string): Promise<Space>; // Espacio específico
  reserveById(id: string, usr:string): Promise<string>; // Realizar reserva
}
