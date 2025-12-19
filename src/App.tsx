import { useState, useMemo } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useElectionData } from './hooks/useElectionData';
import { CandidateCard } from './components/CandidateCard';
import { DifferenceSection } from './components/DifferenceSection';
import { VoteRecordsSection } from './components/VoteRecordsSection';
import { SmallCandidateCard } from './components/SmallCandidateCard';
import { config } from './config/env';
import './App.css';
import { formatTimestamp, getPercentage } from './utils';

function App() {
  const [refreshInterval, setRefreshInterval] = useState(config.defaultRefreshInterval);

  const { loading, refreshing, error, firstPlace, secondPlace, allCandidates, voteDifference, timestamp, voteRecords, refresh } =
    useElectionData(refreshInterval);

  const totalVotes = useMemo(() => {
    return allCandidates.reduce((sum, candidate) => sum + candidate.votos, 0);
  }, [allCandidates]);

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
          <strong>Error al cargar los datos desde el CNE:</strong>
          <br />
          <small>Por favor verifica tu conexión a internet e intenta de nuevo.</small>
        </div>
      )}

      {!loading && !error && firstPlace && secondPlace && (
        <div className='results show'>
          <div className='candidates-row'>
            <CandidateCard candidate={firstPlace} position='first' percentage={getPercentage(firstPlace.votos, totalVotes)} />
            <DifferenceSection difference={voteDifference} />
            <CandidateCard candidate={secondPlace} position='second' percentage={getPercentage(secondPlace.votos, totalVotes)} />
          </div>

          {allCandidates.length > 0 && (
            <div className='other-candidates-row'>
              {allCandidates.slice(2).map((candidate) => (
                <SmallCandidateCard
                  key={candidate.parpo_id}
                  candidate={candidate}
                  percentage={getPercentage(candidate.votos, totalVotes)}
                />
              ))}
            </div>
          )}

          <div className='controls-container'>
            <div className='interval-selector'>
              <label htmlFor='refresh-interval'>Actualización Automática:</label>
              <select
                id='refresh-interval'
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className='interval-select'
              >
                {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                  <option key={i} value={i + 1}>
                    Cada {i + 1} minuto{i + 1 > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <button className='refresh-btn' onClick={refresh} disabled={refreshing}>
              <RefreshCw size={18} className={refreshing ? 'spinning' : ''} />
              {refreshing ? 'Actualizando...' : 'Actualizar Datos'}
            </button>
          </div>
          <div className='timestamp'>Datos actualizados: {formatTimestamp(timestamp)}</div>

          <div className='winner-banner' style={{ '--party-color': firstPlace.parpo_color } as React.CSSProperties}>
            <div className='winner-label'>Ganador Actual</div>
            <div className='winner-name'>{firstPlace.cddto_nombres}</div>
            <div className='winner-party'>{firstPlace.parpo_nombre}</div>
          </div>
          {voteRecords && <VoteRecordsSection records={voteRecords} />}
        </div>
      )}
    </div>
  );
}

export default App;
