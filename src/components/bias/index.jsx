import React from 'react';

const Bias = ({ result }) => {
  let proMenView = null;
  const proMenResults = result.proMen;
  if (proMenResults && Object.keys(proMenResults).length) {
    proMenView = (
      <ul className="pl-0">
        {Object.keys(proMenResults).map(biasWord => {
          return (
            <li className="border border-danger list-group-item">
              <div className="font-weight-bold">
                Pro men bias word {biasWord}
              </div>
              <div>
                Suggestions:
                {Array.isArray(proMenResults[biasWord])
                  ? proMenResults[biasWord].reduce((acc, curr) => {
                      return acc + `${curr},`;
                    }, '')
                  : proMenResults[biasWord]}
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
          return (
            <li className="border border-danger list-group-item">
              <div className="font-weight-bold">
                Pro women bias word {biasWord}
              </div>
              <div>
                Suggestions:
                {Array.isArray(proWomenResults[biasWord])
                  ? proWomenResults[biasWord].reduce((acc, curr) => {
                      return acc + `${curr},`;
                    }, '')
                  : proWomenResults[biasWord]}
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
