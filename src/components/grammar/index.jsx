import React from 'react';
import { Row, Col } from 'reactstrap';
import AlignLeft from 'react-feather/dist/icons/align-left';
import classnames from 'classnames';
import uuid from 'uuid/v4';
import Slider from 'react-slick';

import './styles.css';

const Grammar = ({ result, acceptSuggestion }) => {
  const suggestionItem = (onClick, textValue, wrongWord) => (
    <span
      key={uuid()}
      className="suggestion"
      onClick={() => onClick(wrongWord, textValue)}
    >
      {textValue}
    </span>
  );
  const suggestionView = results =>
    Object.keys(results).map((wrongWord, index, arr) => {
      let suggestions = null;

      if (Array.isArray(results[wrongWord])) {
        suggestions = results[wrongWord].reduce((acc, curr) => {
          acc.push(suggestionItem(acceptSuggestion, curr, wrongWord));
          return acc;
        }, []);
      } else if (results[wrongWord]) {
        suggestions = suggestionView(
          acceptSuggestion,
          results[wrongWord],
          wrongWord
        );
      }
      return (
        <li
          key={uuid()}
          className={classnames(
            'list-group-item position-relative',
            'cardItem'
          )}
        >
          <Row>
            <Col className="grammarWord">{wrongWord}</Col>
          </Row>
          <Row>
            <Col>
              <i>Did you mean</i>
              <span className="suggestedWord">{suggestions}</span>?
            </Col>
          </Row>
          <Row>
            <Col className="text-right font-weight-bold d-flex flex-column justify-content-end">{`${index +
              1}/${arr.length}`}</Col>
          </Row>

          {/* <Row>
            <Col
              className="ignoreButton"
              color="link"
              onClick={() => acceptSuggestion(wrongWord, wrongWord)}
            >
              Ignore
            </Col>
            <Col className="text-right font-weight-bold">{`${index + 1}/${
              arr.length
            }`}</Col>
          </Row> */}
        </li>
      );
    });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let grammarView = null;
  if (Object.keys(result).length) {
    grammarView = (
      <div className="w-100 mb-3">
        <div className="mb-2 mt-3">
          <AlignLeft />
          <div className="font-weight-bold d-inline-block ml-1">
            Spelling and grammar
          </div>
        </div>
        <Slider {...settings} className="slickContainer">
          {suggestionView(result)}
        </Slider>
      </div>
    );
  }
  return <>{grammarView}</>;
};

export default Grammar;
