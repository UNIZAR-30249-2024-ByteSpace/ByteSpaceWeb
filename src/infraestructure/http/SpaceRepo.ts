import axios from './http';
import { Space } from '../../core/space/domain/model';

export class HttpSpaceRepo {
  async getAllSpaces(): Promise<Space[]> {
    interface SpaceDTO {
      _id: string;
      name: string;
      kind: 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';
      address: string;
      lng: number;
      lat: number;
      price: number;
      baseIncome: number;
      owner?: string;
    }
    const response = await axios.get<SpaceDTO[]>('/spaces', {
      headers: {
        accept: 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error('No se puedo obtener las propiedades');
    }
    console.log(response.data);

    return response.data.map((spaceDto) => {
      const prop: Space = {
        address: spaceDto.address,
        id: spaceDto._id,
        income: spaceDto.baseIncome,
        kind: spaceDto.kind,
        lat: spaceDto.lat,
        lng: spaceDto.lng,
        name: spaceDto.name,
        price: spaceDto.price,
        owner: spaceDto.owner,
      };
      return prop;
    });
  }

  async getSpaceById(id: string): Promise<Space> {
    interface spaceDto {
      name: string;
      address: string;
      _id: string;
      price: number;
      baseIncome: number;
      kind: 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';
      owner?: string;
    }
    const response = await axios.get<spaceDto>(`/spaces/${id}`, {
      headers: {
        accept: 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error('No se puedo obtener los datos de la propiedad');
    }
    const spaceRes = response.data;
    const space: Space = {
      address: spaceRes.address,
      id: spaceRes._id,
      income: spaceRes.baseIncome,
      kind: spaceRes.kind,
      lat: 0,
      lng: 0,
      name: spaceRes.name,
      price: spaceRes.price,
      owner: spaceRes.owner,
    };
    console.log(space);
    return space;
  }

  async reserveById(id: string, usr: string): Promise<string> {
    const response = await axios.post<{ id: string }>(`/spaces/${id}/reserve`, {
      ownerId: usr,
    });

    if (response.status !== 201) {
      throw new Error('No se puedo obtener los datos de la propiedad');
    }
    console.log(response.data);
    return response.data.id;
  }
}