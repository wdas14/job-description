import React from 'react';
import './styles.css';

const Bias = ({ result, acceptSuggestion, removeSuggestion }) => {
  let proMenView = null;

  const proMenResults = result.proMen;
  if (proMenResults && Object.keys(proMenResults).length) {
    proMenView = (
      <ul className="pl-0">
        {Object.keys(proMenResults).map(biasWord => {
          let suggestions = null;

          if (Array.isArray(proMenResults[biasWord])) {
            suggestions = proMenResults[biasWord].reduce((acc, curr) => {
              acc.push(
                <span
                  key={curr}
                  className="suggestion"
                  onClick={() => acceptSuggestion(biasWord, curr)}
                >
                  {curr}
                </span>
              );
              return acc;
            }, []);
          } else {
            suggestions = (
              <span
                className="suggestion"
                onClick={() =>
                  acceptSuggestion(biasWord, proMenResults[biasWord])
                }
              >
                {proMenResults[biasWord]}
              </span>
            );
          }
          return (
            <li className="border border-danger list-group-item">
              <div onClick={() => removeSuggestion(biasWord)}>Ignore</div>
              <div>
                <strong>{biasWord}</strong>(pro men)
              </div>
              <div>
                <i>Suggestions:</i>
                {suggestions}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  let proWomenView = null;
  const proWomenResults = result.proWomen;
  if (proWomenResults && Object.keys(proWomenResults).length) {
    proWomenView = (
      <ul className="pl-0">
        {Object.keys(proWomenResults).map(biasWord => {
          let suggestions = null;

          if (Array.isArray(proWomenResults[biasWord])) {
            suggestions = proWomenResults[biasWord].reduce((acc, curr) => {
              acc.push(
                <span
                  key={curr}
                  className="suggestion"
                  onClick={() => acceptSuggestion(biasWord, curr)}
                >
                  {curr}
                </span>
              );
              return acc;
            }, []);
          } else {
            suggestions = (
              <span
                className="suggestion"
                onClick={() =>
                  acceptSuggestion(biasWord, proMenResults[biasWord])
                }
              >
                {proWomenResults[biasWord]}
              </span>
            );
          }
          return (
            <li className="border border-danger list-group-item">
              <div onClick={() => removeSuggestion(biasWord)}>Ignore</div>
              <div>
                <strong>{biasWord}</strong>(pro women)
              </div>
              <div>
                <i>Suggestions:</i>
                {suggestions}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  let biasView = null;
  if (proWomenView || proMenView) {
    biasView = (
      <div className="w-100">
        <ul className="list-group pl-0">
          <li className="border border-danger list-group-item">
            <div className="font-weight-bold">Bias Words</div>
          </li>
          {proMenView}
          {proWomenView}
        </ul>
      </div>
    );
  }
  return <>{biasView}</>;
};

export default Bias;
