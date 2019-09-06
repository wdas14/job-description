import React from 'react';

const Bias = ({ result }) => {
  let proMenView = null;
  const proMenResults = result[1] ? result[1].length : null;
  if (proMenResults) {
    proMenView = (
      <ul className="pl-0">
        {result[1].map(item => {
          return (
            <li className="border border-danger list-group-item">
              <div className="font-weight-bold">
                Pro men bias word {item.proMen[0]}
              </div>
              <div>
                Suggestions:
                {Array.isArray(item.proMen[1])
                  ? item.proMen[1].reduce((acc, curr) => {
                      return acc + `${curr},`;
                    }, '')
                  : item.proMen[1]}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  let proWomenView = null;
  const proWomenResults = result[0] ? result[0].length : null;
  if (proWomenResults) {
    proMenView = (
      <ul className="pl-0">
        {result[0].map(item => {
          return (
            <li className="border border-danger list-group-item">
              <div className="font-weight-bold">
                Pro women bias word {item.proWomen[0]}
              </div>
              <div>
                Suggestions:
                {Array.isArray(item.proWomen[1])
                  ? item.proWomen[1].reduce((acc, curr) => {
                      return acc + `${curr},`;
                    }, '')
                  : item.proWomen[1]}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  let biasView = null;
  if (result.length) {
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
