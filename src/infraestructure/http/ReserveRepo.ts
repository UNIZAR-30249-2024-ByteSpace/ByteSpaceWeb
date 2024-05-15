import axios from 'axios';

export type Reserve = {
  id: string;
  fecha: Date;
  horaInicio: number;
  horaFin: number;
  idPersona: string;
  idEspacio: string;
  potencialInvalida: boolean;
};

export interface IReserveRepo {
    getAllReserves(id: string): Promise<Reserve[]>;
    getAllReservesAdmin(): Promise<Reserve[]>;
    getReserveById(id: string): Promise<Reserve>;
    cancelReserveById(id: string): Promise<string>; // Actualizar el tipo de retorno
    acceptReserveById(id: string): Promise<string>; // Actualizar el tipo de retorno
    createReserve(idEspacio: string, idPersona: string, fecha: Date, horaInicio: number, horaFin: number): Promise<string>;
}
  

export class HttpReserveRepo implements IReserveRepo {
  
  async getAllReserves(id: string): Promise<Reserve[]> {
    try {
      const response = await axios.get<Reserve[]>(`http://localhost:3000/api/reserve/${id}`, {
        headers: {
          accept: 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('No se pudieron obtener las reservas');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
      throw error;
    }
  }

  async getAllReservesAdmin(): Promise<Reserve[]> {
    try {
      const response = await axios.get<Reserve[]>('http://localhost:3000/api/reserve/admin', {
        headers: {
          accept: 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('No se pudieron obtener las reservas del admin');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error al obtener las reservas del admin:', error);
      throw error;
    }
  }

  async getReserveById(id: string): Promise<Reserve> {
    try {
      const response = await axios.get<Reserve>(`/reserves/${id}`, {
        headers: {
          accept: 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('No se pudo obtener la reserva');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error al obtener la reserva:', error);
      throw error;
    }
  }

  async cancelReserveById(id: string): Promise<string> { // Cambiado el tipo de retorno
    try {
      const response = await axios.delete<{ id: string }>(`http://localhost:3000/api/reserve/${id}/cancel`, {
        headers: {
          accept: 'application/json',
        },
      });
      if (response.status !== 204) {
        throw new Error('No se pudo cancelar la reserva');
      }
      
      return response.data.id; // Retornar el ID de la reserva cancelada
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      throw error;
    }
  }

  async acceptReserveById(id: string): Promise<string> { // Cambiado el tipo de retorno
    try {
      const response = await axios.post<{ id: string }>(`http://localhost:3000/api/reserve/${id}/accept`, {
        headers: {
          accept: 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('No se pudo aceptar la reserva');
      }
      
      return response.data.id; // Retornar el ID de la reserva aceptada
    } catch (error) {
      console.error('Error al aceptar la reserva:', error);
      throw error;
    }
  }

  async createReserve(
    idEspacio: string,
    idPersona: string,
    fecha: Date,
    horaInicio: number,
    horaFin: number
  ): Promise<string> {
    try {
      const response = await axios.post<{ id: string }>(`/spaces/${idEspacio}/reserve`, {
        idEspacio,
        idPersona,
        fecha,
        horaInicio,
        horaFin
      });

      if (response.status !== 201) {
        throw new Error('No se pudo crear la reserva');
      }
      
      return response.data.id;
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      throw error;
    }
  }
  
}
