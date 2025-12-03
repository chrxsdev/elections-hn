import type { Candidate } from '../types/election';

interface CandidateCardProps {
  candidate: Candidate;
  position: 'first' | 'second';
}

export const CandidateCard = ({ candidate, position }: CandidateCardProps) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  return (
    <div 
      className={`candidate ${position}`}
      style={{ '--party-color': candidate.parpo_color } as React.CSSProperties}
    >
      <div className="candidate-header">
        <div className="candidate-images">
          <img 
            src={candidate.cddto_link_logo} 
            alt={candidate.cddto_nombres}
            className="candidate-photo"
          />
          <img 
            src={candidate.parpo_link_logo} 
            alt={candidate.parpo_nombre}
            className="party-logo"
          />
        </div>
        <div className="candidate-info">
          <div className="candidate-position">
            {position === 'first' ? '1er Lugar' : '2do Lugar'}
          </div>
          <div className="candidate-name">{candidate.cddto_nombres}</div>
          <div className="candidate-party">{candidate.parpo_nombre}</div>
        </div>
      </div>
      <div className="candidate-votes">{formatNumber(candidate.votos)}</div>
    </div>
  );
};
