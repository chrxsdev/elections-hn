import { useState } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useElectionData } from './hooks/useElectionData';
import { CandidateCard } from './components/CandidateCard';
import { DifferenceSection } from './components/DifferenceSection';
import { VoteRecordsSection } from './components/VoteRecordsSection';
import { formatTimestamp } from './utils/dateUtils';
import { config } from './config/env';
import './App.css';

function App() {
  const [refreshInterval, setRefreshInterval] = useState(config.defaultRefreshInterval);

  const { loading, refreshing, error, firstPlace, secondPlace, voteDifference, timestamp, voteRecords, refresh } =
    useElectionData(refreshInterval);

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

          <div className='winner-banner' style={{ '--party-color': firstPlace.parpo_color } as React.CSSProperties}>
            <div className='winner-label'>Ganador Actual</div>
            <div className='winner-name'>{firstPlace.cddto_nombres}</div>
            <div className='winner-party'>{firstPlace.parpo_nombre}</div>
          </div>

          <div className='controls-container'>
            <div className='interval-selector'>
              <label htmlFor='refresh-interval'>Actualización Automática:</label>
              <select
                id='refresh-interval'
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className='interval-select'
              >
                <option value={1}>Cada 1 minuto</option>
                <option value={2}>Cada 2 minutos</option>
                <option value={3}>Cada 3 minutos</option>
                <option value={4}>Cada 4 minutos</option>
                <option value={5}>Cada 5 minutos</option>
                <option value={6}>Cada 6 minutos</option>
                <option value={7}>Cada 7 minutos</option>
                <option value={8}>Cada 8 minutos</option>
                <option value={9}>Cada 9 minutos</option>
                <option value={10}>Cada 10 minutos</option>
              </select>
            </div>

            <button className='refresh-btn' onClick={refresh} disabled={refreshing}>
              <RefreshCw size={18} className={refreshing ? 'spinning' : ''} />
              {refreshing ? 'Actualizando...' : 'Actualizar Datos'}
            </button>
          </div>
          {voteRecords && <VoteRecordsSection records={voteRecords} />}
        </div>
      )}
    </div>
  );
}

export default App;
