import type { VoteRecords } from '../types/election';

interface VoteRecordsSectionProps {
  records: VoteRecords;
}

export const VoteRecordsSection = ({ records }: VoteRecordsSectionProps) => {
  const percentagePublicadas = records.total > 0 
    ? ((records.publicadas / records.total) * 100).toFixed(2)
    : '0.00';

  const percentageCorrectas = records.total > 0 
    ? ((records.correctas / records.total) * 100).toFixed(2)
    : '0.00';

  return (
    <div className='vote-records-section'>
      <h2 className='vote-records-title'>Información de Actas</h2>
      
      <div className='vote-records-grid'>
        <div className='vote-record-card total'>
          <div className='vote-record-label'>Total de Actas</div>
          <div className='vote-record-value'>{records.total.toLocaleString()}</div>
        </div>

        <div className='vote-record-card valid'>
          <div className='vote-record-label'>Actas Publicadas</div>
          <div className='vote-record-value'>{records.publicadas.toLocaleString()}</div>
          <div className='vote-record-percentage'>{percentagePublicadas}%</div>
        </div>

        <div className='vote-record-card valid'>
          <div className='vote-record-label'>Actas Correctas</div>
          <div className='vote-record-value'>{records.correctas.toLocaleString()}</div>
          <div className='vote-record-percentage'>{percentageCorrectas}%</div>
        </div>

        <div className='vote-record-card pending'>
          <div className='vote-record-label'>En Espera</div>
          <div className='vote-record-value'>{records.espera.toLocaleString()}</div>
        </div>

        <div className='vote-record-card'>
          <div className='vote-record-label'>Inconsistencias</div>
          <div className='vote-record-value'>{records.inconsistencias.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
