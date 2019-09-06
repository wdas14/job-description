import React from 'react';
import Structure from '../structure';
import Bias from '../bias';

const JobGuidance = ({ structureRes, bias }) => {
  return (
    <>
      <h4 className="d-block">Job Guidance</h4>
      <Structure result={structureRes} />
      <Bias result={bias} />
    </>
  );
};

export default JobGuidance;
