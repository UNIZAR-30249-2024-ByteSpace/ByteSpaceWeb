import { Reserve } from './model';

export interface IReserveRepo {
  // Las operaciones que te marque Rael
  getAllReserves(id: string): Promise<Reserve[]>; // Todos los reservas del usuario
  cancelReserveById(id: string): Promise<string>; // Realizar reserva
}
