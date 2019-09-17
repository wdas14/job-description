import React from 'react';
import { Row, Col } from 'reactstrap';
import Globe from 'react-feather/dist/icons/globe';
import classnames from 'classnames';
import uuid from 'uuid/v4';
import Slider from 'react-slick';

import './styles.css';

const Bias = ({ result, acceptSuggestion }) => {
  const suggestionItem = (onClick, textValue, bias) => (
    <span
      key={uuid()}
      className="suggestion"
      onClick={() => onClick(bias, textValue)}
    >
      {textValue}
    </span>
  );
  const suggestionView = results =>
    Object.keys(results).map(biasWord => {
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
            <Col>
              <span className="biasLabel">Gender Inclusive</span>
            </Col>
          </Row>
          <Row>
            <Col className="biasWord">{biasWord}</Col>
            <Col>
              <i>Suggestions:</i>
              {suggestions}
            </Col>
          </Row>

          <Row>
            <Col
              className="ignoreButton"
              color="link"
              onClick={() => acceptSuggestion(biasWord, biasWord)}
            >
              Ignore
            </Col>
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
        <ul className="pl-0">
          <li className="list-group-item border-0">
            <Globe />
            <div className="font-weight-bold d-inline-block ml-1">Language</div>
          </li>
          <Slider {...settings} className="slickContainer">
            {proMenView}
            {proWomenView}
          </Slider>
        </ul>
      </div>
    );
  }
  return <>{biasView}</>;
};

export default Bias;
