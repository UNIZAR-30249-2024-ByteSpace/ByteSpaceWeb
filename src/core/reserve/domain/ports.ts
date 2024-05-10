import { Reserve } from './model';

export interface ISpaceRepo {
  // Las operaciones que te marque Rael
  getAllReserves(id: string): Promise<Reserve[]>; // Todos los espacios reservables
  cancelById(id: string): Promise<string>; // Realizar reserva
}
