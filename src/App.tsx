import { useState, useEffect } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { fetchElectionData } from './services/electionService';
import { CandidateCard } from './components/CandidateCard';
import { DifferenceSection } from './components/DifferenceSection';
import { formatTimestamp } from './utils/dateUtils';
import './App.css';
import type { Candidate } from './types/election';

function App() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstPlace, setFirstPlace] = useState<Candidate | null>(null);
  const [secondPlace, setSecondPlace] = useState<Candidate | null>(null);
  const [voteDifference, setVoteDifference] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    const loadElectionData = async () => {
      try {
        const data = await fetchElectionData();
        const fetchTime = new Date().toISOString();

        // Normalize and validate vote counts
        const normalizedCandidates = data.candidatos.map(candidate => ({
          ...candidate,
          votos: Number(candidate.votos) || 0
        }));

        // Sort candidates by votes (descending order)
        const sortedCandidates = [...normalizedCandidates].sort((a, b) => b.votos - a.votos);

        const first = sortedCandidates[0];
        const second = sortedCandidates[1];
        const difference = first.votos - second.votos;

        setFirstPlace(first);
        setSecondPlace(second);
        setVoteDifference(difference);
        setTimestamp(fetchTime);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error');
        setLoading(false);
      }
    };

    loadElectionData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);

    try {
      const data = await fetchElectionData();
      const fetchTime = new Date().toISOString();

      // Normalize and validate vote counts
      const normalizedCandidates = data.candidatos.map(candidate => ({
        ...candidate,
        votos: Number(candidate.votos) || 0
      }));

      // Sort candidates by votes (descending order)
      const sortedCandidates = [...normalizedCandidates].sort((a, b) => b.votos - a.votos);

      const first = sortedCandidates[0];
      const second = sortedCandidates[1];
      const difference = first.votos - second.votos;

      setFirstPlace(first);
      setSecondPlace(second);
      setVoteDifference(difference);
      setTimestamp(fetchTime);
      setRefreshing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error');
      setRefreshing(false);
    }
  };

  return (
    <div className='container'>
      <h1>Resultados Electorales Honduras 2025</h1>
      <p className='subtitle'>Calculadora de Diferencia de Votos</p>

      {loading && (
        <div className='loading-container'>
          <Loader2 className='loader-icon' size={48} />
          <p className='loading-text'>Cargando datos electorales...</p>
        </div>
      )}

      {error && (
        <div className='error'>
          <strong>Error al cargar los datos:</strong>
          <br />
          {error}
          <br />
          <br />
          <small>Por favor verifica tu conexión a internet e intenta de nuevo.</small>
        </div>
      )}

      {!loading && !error && firstPlace && secondPlace && (
        <div className='results show'>
          <div className='candidates-row'>
            <CandidateCard candidate={firstPlace} position='first' />
            
            <DifferenceSection difference={voteDifference} />
            
            <CandidateCard candidate={secondPlace} position='second' />
          </div>

          <div className='timestamp'>Datos actualizados: {formatTimestamp(timestamp)}</div>

          <div 
            className='winner-banner'
            style={{ '--party-color': firstPlace.parpo_color } as React.CSSProperties}
          >
            <div className='winner-label'>Ganador Actual</div>
            <div className='winner-name'>{firstPlace.cddto_nombres}</div>
            <div className='winner-party'>{firstPlace.parpo_nombre}</div>
          </div>

          <button className='refresh-btn' onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw size={18} className={refreshing ? 'spinning' : ''} />
            {refreshing ? 'Actualizando...' : 'Actualizar Datos'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
