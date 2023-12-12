import React from 'react';

interface SuggestCardProps {
  collegeName: string;
  programName: string;
}

const SuggestCard: React.FC<SuggestCardProps> = ({ collegeName, programName }) => {
  return (
    <div className="suggestcard">
      <h3>{collegeName}</h3>
      <p>{programName}</p>
    </div>
  );
};

export default SuggestCard;