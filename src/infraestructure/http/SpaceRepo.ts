import axios from 'axios';

export type Kind = 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';

export type Space = {
  id: string;
  tamanio: number;
  tipo: Kind; // Utiliza la enumeración Kind en lugar de un tipo string
  maxOcupantes: number;
  informacion: string;
  reservable: boolean;
  categoria: Kind;
  porcentajeOcupacion: number;
  planta: number;
  asignadoA: string;
};


export class HttpSpaceRepo {
  
  async getAllSpaces(): Promise<Space[]> {
    interface SpaceDTO {
      id: string;
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
          id: spaceDto.id,
          tamanio: spaceDto.tamanio,
          tipo: mapTipoToKind(spaceDto.tipo), // Mapear el tipo al tipo Kind
          maxOcupantes: spaceDto.maxOcupantes,
          informacion: spaceDto.informacion,
          reservable: spaceDto.reservable,
          categoria: mapTipoToKind(spaceDto.categoria),
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
      id: string;
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
      const response = await axios.get<any>(`http://localhost:3000/api/spaces/${id}`, {
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
      console.log("Existe 0 :", spaceDto.hasOwnProperty('0'));
      if (spaceDto.hasOwnProperty('0')) {
        const tipo = spaceDto['0'].tipo;
        console.log('Tipo bueno?:', tipo);
      } else {
        console.log('El valor 0 no está presente en el objeto DTO.');
      }
      
      const space: Space = {
        id: spaceDto['0'].id,
        tamanio: spaceDto['0'].tamanio,
        tipo: mapTipoToKind(spaceDto['0'].tipo),
        maxOcupantes: spaceDto['0'].maxOcupantes,
        informacion: spaceDto['0'].informacion,
        reservable: spaceDto['0'].reservable,
        categoria: mapTipoToKind(spaceDto['0'].categoria),
        porcentajeOcupacion: spaceDto['0'].porcentajeOcupacion,
        planta: spaceDto['0'].planta,
        asignadoA: spaceDto['0'].asignadoA,
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
    const response = await axios.post<{ id: string, usr: string, fecha: Date, hora_inicio: number, hora_fin: number, asistentes: number }>(`/spaces/${id}/reserve`, {
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
