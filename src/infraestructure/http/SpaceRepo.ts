import axios from 'axios';

export type Space = {
  id: string;
  tamanio: number;
  kind: 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';
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
      kind: 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';
      maxOcupantes: number;
      informacion: string;
      reservable: boolean;
      categoria: string;
      porcentajeOcupacion: number;
      planta: number;
      asignadoA: string;
    }
    const response = await axios.get<SpaceDTO[]>('/spaces', {
      headers: {
        accept: 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error('No se pudo obtener las propiedades');
    }
    console.log(response.data);

    return response.data.map((spaceDto) => {
      const prop: Space = {
        id: spaceDto._id,
        tamanio: spaceDto.tamanio,
        kind: spaceDto.kind,
        maxOcupantes: spaceDto.maxOcupantes,
        informacion: spaceDto.informacion,
        reservable: spaceDto.reservable,
        categoria: spaceDto.categoria,
        porcentajeOcupacion: spaceDto.porcentajeOcupacion,
        planta: spaceDto.planta,
        asignadoA: spaceDto.asignadoA,
      };
      return prop;
    });
  }

  async getSpaceById(id: string): Promise<Space> {
    interface SpaceDTO {
      _id: string;
      tamanio: number;
      kind: 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';
      maxOcupantes: number;
      informacion: string;
      reservable: boolean;
      categoria: string;
      porcentajeOcupacion: number;
      planta: number;
      asignadoA: string;
    }
    const response = await axios.get<SpaceDTO>(`/spaces/${id}`, {
      headers: {
        accept: 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error('No se pudo obtener los datos de la propiedad');
    }
    const spaceRes = response.data;
    const space: Space = {
      id: spaceRes._id,
      tamanio: spaceRes.tamanio,
      kind: spaceRes.kind,
      maxOcupantes: spaceRes.maxOcupantes,
      informacion: spaceRes.informacion,
      reservable: spaceRes.reservable,
      categoria: spaceRes.categoria,
      porcentajeOcupacion: spaceRes.porcentajeOcupacion,
      planta: spaceRes.planta,
      asignadoA: spaceRes.asignadoA,
    };
    console.log(space);
    return space;
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
