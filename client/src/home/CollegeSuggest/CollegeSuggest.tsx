import React, { ReactNode } from 'react';
import { ReactElement } from "react";
import { useSelector } from 'react-redux';
import { getSuggestedPrograms } from '../../store/slices/college-suggest';
import SuggestCard from './SuggestCard';

const CollegeSuggest: React.FC = (): ReactElement => {
    const suggestedPrograms = useSelector(getSuggestedPrograms());
      

  return (
    <div style={{position:"absolute", left:700, top: 100, width: "800px", height:"86vh", overflowY:"auto"}}>
        {suggestedPrograms.map((program)=>{
           return( <SuggestCard program={program}/>)
        })}
    </div>
  );
};

export default CollegeSuggest;