import axios from 'axios';
import type { ApiPayload, ElectionData } from '../types/election';
import { config } from '../config/env';

const API_PAYLOAD: ApiPayload = {
  codigos: [],
  tipco: '01',      // Election type: 01 = Presidential
  depto: '00',      // Department: 00 = National
  comuna: '00',
  mcpio: '000',
  zona: '',
  pesto: '',
  mesa: 0
};

export const fetchElectionData = async (): Promise<ElectionData> => {
  const response = await axios.post<ElectionData>(config.apiEndpoint, API_PAYLOAD, {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'authorization': 'Bearer null',
      'Referer': config.apiReferer
    }
  });

  if (!response.data.candidatos || !Array.isArray(response.data.candidatos)) {
    throw new Error('Invalid response structure: candidatos array not found');
  }

  if (response.data.candidatos.length < 2) {
    throw new Error('Not enough candidates in response (need at least 2)');
  }

  return response.data;
};
