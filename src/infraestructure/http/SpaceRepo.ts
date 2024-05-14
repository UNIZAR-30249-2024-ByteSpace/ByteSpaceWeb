import axios from 'axios';

export type Kind = 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';


export type Space = {
  id: string;
  tamanio: number;
  kind: Kind; // Utiliza la enumeración Kind en lugar de un tipo string
  maxOcupantes: number;
  informacion: string;
  reservable: boolean;
  categoria: string;
  porcentajeOcupacion: number;
  planta: number;
  asignadoA: string;
};


export class HttpSpaceRepo {
  
  async getAllSpaces(): Promise<Space[]> {
    interface SpaceDTO {
      _id: string;
      tamanio: number;
      tipo: string; // Cambiado de 'kind' a 'tipo' para reflejar el nombre del campo en los datos del backend
      maxOcupantes: number;
      informacion: string;
      reservable: boolean;
      categoria: string;
      porcentajeOcupacion: number;
      planta: number;
      asignadoA: string;
    }

    console.log("PASO 1 ");
    
    try {
      const response = await axios.get<SpaceDTO[]>('http://localhost:3000/api/spaces/', {
        headers: {
          accept: 'application/json',
        },
      });

      console.log("PASO 2 ");

      console.log('Datos recibidos del backend:', response.data);

      if (response.status !== 200) {
        throw new Error('No se pudo obtener las propiedades');
      }
      
      return response.data.map((spaceDto) => {
        console.log('DTO del espacio:', spaceDto);
        const prop: Space = {
          id: spaceDto._id,
          tamanio: spaceDto.tamanio,
          kind: mapTipoToKind(spaceDto.tipo), // Mapear el tipo al tipo Kind
          maxOcupantes: spaceDto.maxOcupantes,
          informacion: spaceDto.informacion,
          reservable: spaceDto.reservable,
          categoria: spaceDto.categoria,
          porcentajeOcupacion: spaceDto.porcentajeOcupacion,
          planta: spaceDto.planta,
          asignadoA: spaceDto.asignadoA,
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
    interface SpaceDTO {
      _id: string;
      tamanio: number;
      tipo: string; // Cambiado de 'kind' a 'tipo' para reflejar el nombre del campo en los datos del backend
      maxOcupantes: number;
      informacion: string;
      reservable: boolean;
      categoria: string;
      porcentajeOcupacion: number;
      planta: number;
      asignadoA: string;
    }

    try {
      const response = await axios.get<SpaceDTO>(`http://localhost:3000/api/spaces/${id}`, {
        headers: {
          accept: 'application/json',
        },
      });
  
      console.log("PASO 2 ");
      console.log('Datos recibidos del backend:', response.data);
  
      if (response.status !== 200) {
        throw new Error('No se pudo obtener las propiedades');
      }
      
      const spaceDto = response.data;
      console.log('DTO del espacio:', spaceDto);
  
      const space: Space = {
        id: spaceDto._id,
        tamanio: spaceDto.tamanio,
        kind: mapTipoToKind(spaceDto.tipo),
        maxOcupantes: spaceDto.maxOcupantes,
        informacion: spaceDto.informacion,
        reservable: spaceDto.reservable,
        categoria: spaceDto.categoria,
        porcentajeOcupacion: spaceDto.porcentajeOcupacion,
        planta: spaceDto.planta,
        asignadoA: spaceDto.asignadoA,
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
    hora_fin: number
  ): Promise<string> {
    const response = await axios.post<{ id: string, usr: string, fecha: Date, hora_inicio: number, hora_fin: number }>(`/spaces/${id}/reserve`, {
      ownerId: usr,
    });

    if (response.status !== 201) {
      throw new Error('No se pudo obtener los datos de la propiedad');
    }
    console.log(response.data);
    return response.data.id;
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
