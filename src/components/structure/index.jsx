import React from 'react';

const Structure = ({ result }) => {
  const { listPercentage, sentenceCountAverage, structure, wordCount } = result;
  let header = false;
  let paragraph = false;

  if (structure) {
    header = structure.header;
    paragraph = structure.paragraph;
  }
  let listSuggestion = null;
  if (listPercentage <= 33 || listPercentage >= 45) {
    listSuggestion = (
      <li className="border border-primary list-group-item">
        <div className="font-weight-bold">
          Current list percentage: {listPercentage}
        </div>
        <div>
          We suggest that 1/3 of your job description should be bullet pointed.
        </div>
      </li>
    );
  }
  let sentenceCountSuggestion = null;
  if (sentenceCountAverage <= 13) {
    sentenceCountSuggestion = (
      <li className="border border-primary list-group-item">
        <div className="font-weight-bold">
          Current sentence word count: {sentenceCountAverage}
        </div>
        <div>
          We suggest the average word count per sentencet to be less than 13.
        </div>
      </li>
    );
  }
  let headerSuggestion = null;
  if (!header || !paragraph) {
    headerSuggestion = (
      <li className="border border-primary list-group-item">
        <div className="font-weight-bold">
          We suggest you have at least 3 x paragraphs/headers.
        </div>
      </li>
    );
  }
  let wordCountSuggestion = null;
  if (wordCount < 700) {
    wordCountSuggestion = (
      <li className="border border-primary list-group-item">
        <div className="font-weight-bold">Current word count: {wordCount}</div>
        <div>
          We suggest you have at least 700 words in your job description.
        </div>
      </li>
    );
  }
  let structureView = null;
  if (Object.keys(result).length) {
    structureView = (
      <div className="w-100">
        <ul className="list-group">
          <li className="border border-primary list-group-item">
            <div className="font-weight-bold">Structure</div>
          </li>
          {listSuggestion}
          {sentenceCountSuggestion}
          {headerSuggestion}
          {wordCountSuggestion}
        </ul>
      </div>
    );
  }
  return <>{structureView}</>;
};

export default Structure;
