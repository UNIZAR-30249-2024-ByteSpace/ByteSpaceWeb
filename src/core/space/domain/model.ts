export type Kind = 'aula' | 'salacomun' | 'seminario' | 'laboratorio' | 'despacho';

export type Space = {
  _id: string;
  _tamanio: number;
  _tipo: Kind; 
  _maxOcupantes: number;
  _informacion: string;
  _reservable: boolean;
  _categoria: Kind; // Utiliza la enumeración Kind en lugar de un tipo string
  _porcentajeOcupacion: number;
  _planta: number;
  _asignadoA: string;
  _horaInicio: number;
  _horaFin: number;
};
