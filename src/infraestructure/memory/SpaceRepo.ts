import { Space } from '../../core/space/domain/model';

export class MemorieSpaceRepo {
  list: Space[] = [
    {
      name: 'Propiedad 1',
      id: '1',
      address: 'Avenida academia nº12',
      kind: 'despacho',
      price: 240000,
      lat: 41.6488,
      lng: -0.8891,
      income: 0,
    },
    {
      name: 'Propiedad 2',
      id: '2',
      address: 'Avenida academia nº12',
      kind: 'laboratorio',
      price: 240000,
      owner: 'Juan',
      lat: 41.6488,
      lng: -0.8891,
      income: 0,
    },
    {
      name: 'Propiedad 3',
      id: '3',
      address: 'Avenida academia nº12',
      kind: 'salacomun',
      price: 240000,
      lat: 41.6488,
      lng: -0.8891,
      income: 0,
    },
    {
      name: 'Propiedad 4',
      id: '4',
      address: 'Avenida academia nº12',
      kind: 'seminario',
      price: 240000,
      lat: 41.6488,
      lng: -0.8891,
      income: 0,
    },
    {
      name: 'Propiedad 1',
      id: '1',
      address: 'Avenida academia nº12',
      kind: 'aula',
      price: 240000,
      lat: 41.6488,
      lng: -0.8891,
      income: 0,
    },
    {
      name: 'Propiedad 2',
      id: '2',
      address: 'Avenida academia nº12',
      kind: 'aula',
      price: 240000,
      owner: 'Juan',
      lat: 41.6488,
      lng: -0.8891,
      income: 0,
    },
    {
      name: 'Propiedad 3',
      id: '3',
      address: 'Avenida academia nº12',
      kind: 'aula',
      price: 240000,
      lat: 41.6488,
      lng: -0.8891,
      income: 0,
    },
    {
      name: 'Propiedad 4',
      id: '4',
      address: 'Avenida academia nº12',
      kind: 'aula',
      price: 240000,
      lat: 41.6488,
      lng: -0.8891,
      income: 0,
    },
  ];

  getAllSpaces(): Promise<Space[]> {
    return new Promise((resolve, reject) => {
      // Aquí puedes hacer la lógica de la llamada HTTP, por ejemplo:
      setTimeout(() => {
        resolve(this.list);
      }, 100); // Simulando una llamada HTTP que tarda 1 segundo
    });
  }

  getSpaceById(id: string): Promise<Space> {
    return new Promise((resolve, reject) => {
      // Aquí puedes hacer la lógica de la llamada HTTP, por ejemplo:
      setTimeout(() => {
        resolve(this.list[1]);
      }, 100); // Simulando una llamada HTTP que tarda 1 segundo
    });
  }

  reserve(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Aquí puedes hacer la lógica de la llamada HTTP, por ejemplo:
      setTimeout(() => {
        resolve(true);
      }, 100); // Simulando una llamada HTTP que tarda 1 segundo
    });
  }
}

