interface DifferenceSectionProps {
  difference: number;
}

export const DifferenceSection = ({ difference }: DifferenceSectionProps) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className="difference-section">
      <div className="difference-label">Diferencia de Votos</div>
      <div className="difference-value">{formatNumber(difference)}</div>
    </div>
  );
};
