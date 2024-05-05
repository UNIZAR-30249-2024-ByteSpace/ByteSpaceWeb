export type Kind = 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';

export type Space = {
  name: string;
  id: string;
  kind: Kind;
  address: string;
  price: number;
  income: number;
  owner?: string;
  lat: number;
  lng: number;
};
