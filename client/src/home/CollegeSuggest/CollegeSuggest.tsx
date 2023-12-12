// CollegeSuggest.tsx
import React from 'react';
import Card from './SuggestCard';

const CollegeSuggest: React.FC = () => {
  // Sample data for 9 cards
  const cardsData = [
    { collegeName: 'College A', programName: 'Program 1' },
    { collegeName: 'College B', programName: 'Program 2' },
    { collegeName: 'College C', programName: 'Program 3' },
    { collegeName: 'College D', programName: 'Program 4' },
    { collegeName: 'College E', programName: 'Program 5' },
    { collegeName: 'College F', programName: 'Program 6' },
    { collegeName: 'College G', programName: 'Program 7' },
    { collegeName: 'College H', programName: 'Program 8' },
    { collegeName: 'College I', programName: 'Program 9' },
  ];

  return (
    <div className="collegesuggest">
      <h1>Suggested Colleges and Programs</h1>
      <div className="suggestcard-container">
        {cardsData.map((data, index) => (
          <Card
            key={index}
            collegeName={data.collegeName}
            programName={data.programName}
          />
        ))}
      </div>
    </div>
  );
};

export default CollegeSuggest;
