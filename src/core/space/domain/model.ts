export type Kind = 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';

export type Space = {
  id: string;
  tamanio: number;
  tipo: string; 
  maxOcupantes: number;
  informacion: string;
  reservable: boolean;
  categoria: Kind; // Utiliza la enumeración Kind en lugar de un tipo string
  porcentajeOcupacion: number;
  planta: number;
  asignadoA: string;
};
