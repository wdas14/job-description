import React from 'react';
import X from 'react-feather/dist/icons/x';
import './styles.css';

const Bias = ({ result, acceptSuggestion }) => {
  const suggestionItem = (onClick, textValue, bias) => (
    <span
      key={textValue}
      className="suggestion"
      onClick={() => onClick(bias, textValue)}
    >
      {textValue}
    </span>
  );
  const suggestionView = results => (
    <ul className="pl-0">
      {Object.keys(results).map(biasWord => {
        let suggestions = null;

        if (Array.isArray(results[biasWord])) {
          suggestions = results[biasWord].reduce((acc, curr) => {
            acc.push(suggestionItem(acceptSuggestion, curr, biasWord));
            return acc;
          }, []);
        } else if (results[biasWord]) {
          suggestions = suggestionView(
            acceptSuggestion,
            results[biasWord],
            biasWord
          );
        }
        return (
          <li className="border border-warning list-group-item position-relative">
            <X
              onClick={() => acceptSuggestion(biasWord, biasWord)}
              className="xIcon"
              size={20}
            />
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
  let proMenView = null;
  const proMenResults = result.proMen;
  if (proMenResults && Object.keys(proMenResults).length) {
    proMenView = suggestionView(proMenResults);
  }
  let proWomenView = null;
  const proWomenResults = result.proWomen;
  if (proWomenResults && Object.keys(proWomenResults).length) {
    proWomenView = suggestionView(proWomenResults);
  }
  let biasView = null;
  if (proWomenView || proMenView) {
    biasView = (
      <div className="w-100">
        <ul className="list-group pl-0">
          <li className="border border-warning list-group-item">
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
