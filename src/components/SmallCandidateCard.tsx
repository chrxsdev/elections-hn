import type { Candidate } from '../types/election';
import { floorTo } from '../utils';

interface SmallCandidateCardProps {
  candidate: Candidate;
  percentage: number;
}

export const SmallCandidateCard = ({ candidate, percentage }: SmallCandidateCardProps) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className='small-candidate-card'>
    <div
        className='small-candidate-color-bar'
        style={{ backgroundColor: candidate.parpo_color }}
      />
      <div className='small-candidate-content'>
        <div className='small-candidate-photo-container'>
          <img
            className='small-candidate-photo'
            src={candidate.cddto_link_logo}
            alt={candidate.cddto_nombres}
          />
        </div>
        <div className='small-candidate-info'>
          <div className='small-candidate-name'>{candidate.cddto_nombres}</div>
          <div className='small-candidate-party'>{candidate.parpo_nombre}</div>
          <div className='small-candidate-stats'>
            <span className='small-candidate-votes'>{formatNumber(candidate.votos)}</span>
            <span className='small-candidate-percentage'>{floorTo(percentage)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
