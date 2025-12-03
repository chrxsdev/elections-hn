/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Candidate {
  cddto_codigo: string;
  cddto_nombres: string;
  cddto_apellidos: string;
  parpo_id: string;
  parpo_nombre: string;
  parpo_color: string;
  parpo_link_logo: string;
  cddto_link_logo: string;
  votos: number;
  integrantes: any[];
  parpo_id_int: number;
}

export interface ElectionData {
  fecha_corte: string;
  candidatos: Candidate[];
}

export interface ApiPayload {
  codigos: string[];
  tipco: string;
  depto: string;
  comuna: string;
  mcpio: string;
  zona: string;
  pesto: string;
  mesa: number;
}
