import axios from 'axios';

export type Kind = 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';

export type Space = {
  _id: string;
  _tamanio: number;
  _tipo: string; // Utiliza la enumeración Kind en lugar de un tipo string
  _maxOcupantes: number;
  _informacion: string;
  _reservable: boolean;
  _categoria: string;
  _porcentajeOcupacion: number;
  _planta: number;
  _asignadoA: string;
  _horaInicio: number;
  _horaFin: number;
};

export type espacio = {
  _id: string;
  _tamanio: number;
  _maxOcupantes: number;
  _informacion: string;
  _reservable: boolean;
  _porcentajeOcupacion: number;
  _planta: number;
  _horaInicio: number;
  _horaFin: number;
};


export class HttpSpaceRepo {
  
  async getAllSpaces(): Promise<Space[]> {
    interface SpaceDTO {
      _id: string;
      _tamanio: number;
      _tipo: string; // Cambiado de 'kind' a 'tipo' para reflejar el nombre del campo en los datos del backend
      _maxOcupantes: number;
      _informacion: string;
      _reservable: boolean;
      _categoria: string;
      _porcentajeOcupacion: number;
      _planta: number;
      _asignadoA: string;
      _horaInicio: number;
      _horaFin: number;
      _espacio: espacio;
    }
    
    try {
      const response = await axios.get<SpaceDTO[]>('http://localhost:4000/api/spaces/', {
        headers: {
          accept: 'application/json',
        },
      });

      console.log('Datos recibidos del backend:', response.data);

      if (response.status !== 200) {
        throw new Error('No se pudo obtener las propiedades');
      }
      
      return response.data.map((spaceDto) => {
        console.log('DTO del espacio:', spaceDto._espacio);
        const prop: Space = {
          _id: spaceDto._espacio._id,
          _tamanio: spaceDto._espacio._tamanio,
          _tipo: spaceDto._tipo, // Mapear el tipo al tipo Kind
          _maxOcupantes: spaceDto._espacio._maxOcupantes,
          _informacion: spaceDto._espacio._informacion,
          _reservable: spaceDto._espacio._reservable,
          _categoria: spaceDto._categoria,
          _porcentajeOcupacion: spaceDto._espacio._porcentajeOcupacion,
          _planta: spaceDto._espacio._planta,
          _asignadoA: spaceDto._asignadoA,
          _horaInicio: spaceDto._espacio._horaInicio,
          _horaFin: spaceDto._espacio._horaFin,
        };
        console.log('Espacio mapeado:', prop);
        return prop;
      });
    } catch (error) {
      console.error('Error al obtener los espacios:', error);
      throw error;
    }
  }

  async getSpaceById(id: string): Promise<Space> {
    console.log("ID: " + id)
    interface SpaceDTO {
      _id: string;
      _tamanio: number;
      _tipo: string; // Cambiado de 'kind' a 'tipo' para reflejar el nombre del campo en los datos del backend
      _maxOcupantes: number;
      _informacion: string;
      _reservable: boolean;
      _categoria: string;
      _porcentajeOcupacion: number;
      _planta: number;
      _asignadoA: string;
      _horaInicio: number;
      _horaFin: number;
    }

    try {
      const response = await axios.get<any>(`http://localhost:4000/api/spaces/${id}`, {
        headers: {
          accept: 'application/json',
        },
      });
  
      console.log('Datos recibidos del backend:', response.data);
  
      if (response.status !== 200) {
        throw new Error('No se pudo obtener las propiedades');
      }

      const spaceDto = response.data;
      const space: Space = {
        _id: spaceDto._espacio._id,
        _tamanio: spaceDto._espacio._tamanio,
        _tipo: spaceDto._tipo, // Mapear el tipo al tipo Kind
        _maxOcupantes: spaceDto._espacio._maxOcupantes,
        _informacion: spaceDto._espacio._informacion,
        _reservable: spaceDto._espacio._reservable,
        _categoria: spaceDto._categoria,
        _porcentajeOcupacion: spaceDto._espacio._porcentajeOcupacion,
        _planta: spaceDto._espacio._planta,
        _asignadoA: spaceDto._asignadoA,
        _horaInicio: spaceDto._espacio._horaInicio,
        _horaFin: spaceDto._espacio._horaFin,
      };
  
      console.log('Espacio mapeado:', space);
      
      return space;
    } catch (error) {
      console.error('Error al obtener el espacio:', error);
      throw error;
    }
  }

  async reserveById(
    id: string,
    usr: string,
    fecha: Date,
    hora_inicio: number,
    hora_fin: number,
    asistentes: number 
  ): Promise<string> {
    const response = await axios.post<{ id: string, usr: string, fecha: Date, hora_inicio: number, hora_fin: number, asistentes: number }>(`/reserve/${id}/reserve`, {
      ownerId: usr,
      fecha: fecha,
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
      asistentes: asistentes // Añadimos el número de asistentes al cuerpo de la solicitud
    });
  
    if (response.status !== 201) {
      throw new Error('No se pudo obtener los datos de la propiedad');
    }
    console.log(response.data);
    return response.data.id;
  }

  async modifyById(
    id: string,
    reservable: boolean,
    categoria: string,
    asignadoA: string,
    porcentajeOcupacion: number
  ): Promise<string> {
    try {
      const response = await axios.post<{ id: string }>(
        `http://localhost:4000/api/spaces/actualizarEspacio`,
        {
          id: id,
          reservable: reservable,
          categoria: categoria,
          asignadoA: asignadoA,
          porcentajeOcupacion: porcentajeOcupacion
        }
      );
  
      if (response.status !== 201) {
        throw new Error('No se pudo actualizar el espacio');
      }
  
      console.log(response.data);
      return response.data.id;
    } catch (error) {
      console.error('Error al modificar el espacio:', error);
      throw new Error('Error al modificar el espacio');
    }
  }
}


function mapTipoToKind(tipo: string): Kind {
  switch (tipo) {
    case 'aula':
      return 'aula';
    case 'salacomun':
      return 'salacomun';
    case 'seminario':
      return 'seminario';
    case 'laboratorio':
      return 'laboratorio';
    case 'despacho':
      return 'despacho';
    default:
      throw new Error(`Tipo de espacio desconocido: ${tipo}`);
  }
}
