import React from 'react';
import { Row, Col } from 'reactstrap';
import Globe from 'react-feather/dist/icons/globe';
import classnames from 'classnames';
import uuid from 'uuid/v4';
import Slider from 'react-slick';

import './styles.css';

const Bias = ({ result, acceptSuggestion }) => {
  const suggestionItem = (onClick, textValue, bias) => (
    <li
      key={uuid()}
      className="suggestion"
      onClick={() => onClick(bias, textValue)}
    >
      <span>{textValue}</span>
    </li>
  );

  const suggestionView = results =>
    Object.keys(results).map((biasWord, index, arr) => {
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
        <li
          key={uuid()}
          className={classnames(
            'list-group-item position-relative',
            'biasItem'
          )}
        >
          <Row>
            <Col className="biasWord">{biasWord}</Col>
          </Row>
          <Row className="mt-3">
            <Col>
              {`This is considered a `}
              <i>
                <u>gender specific</u>
              </i>
              {` word. Why not use one of this
              instead:`}
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="pl-3 mt-1">{suggestions}</ul>
            </Col>
            <Col className="text-right font-weight-bold d-flex flex-column justify-content-end">{`${index +
              1}/${arr.length}`}</Col>
          </Row>
        </li>
      );
    });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const proMenResults = result.proMen;
  const proWomenResults = result.proWomen;
  let biasView = null;
  if (
    Object.keys(proMenResults).length ||
    Object.keys(proWomenResults).length
  ) {
    const resultView = suggestionView({ ...proWomenResults, ...proMenResults });
    biasView = (
      <div className="w-100 mb-3">
        <div className="mb-2 mt-3">
          <Globe />
          <div className="font-weight-bold d-inline-block ml-1">Language</div>
        </div>
        <Slider {...settings} className="slickContainer">
          {resultView}
        </Slider>
      </div>
    );
  }
  return <>{biasView}</>;
};

export default Bias;
