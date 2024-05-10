export type Kind = 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';

export type Space = {
  id: string;
  tamanio: number;
  kind: Kind;
  maxOcupantes: number;
  informacion: string;
  reservable: boolean;
  categoria: string;
  porcentajeOcupacion: number;
  planta: number;
  asignadoA: string;
};
