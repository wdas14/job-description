import React from 'react';
import classnames from 'classnames';
import { Col, Row } from 'reactstrap';
import FileText from 'react-feather/dist/icons/file-text';
import Slider from 'react-slick';
import './styles.css';

const Structure = ({ result }) => {
  const { listPercentage, sentenceCountAverage, structure, wordCount } = result;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  let header = false;
  let paragraph = false;
  if (structure) {
    header = structure.header;
    paragraph = structure.paragraph;
  }
  let count = 0;
  let resultLen = 0;
  if (listPercentage <= 33 || listPercentage >= 45) {
    resultLen++;
  }
  if (sentenceCountAverage <= 13) {
    resultLen++;
  }
  if (!header || !paragraph) {
    resultLen++;
  }
  if (wordCount < 700) {
    resultLen++;
  }

  let listSuggestion = null;
  if (listPercentage <= 33 || listPercentage >= 45) {
    count++;
    listSuggestion = (
      <li className={classnames('list-group-item', 'structureItem')}>
        <Row>
          <Col>Current list percentage: {listPercentage}</Col>
        </Row>

        <Row>
          <Col>
            We suggest that 1/3 of your job description should be bullet
            pointed.
          </Col>
        </Row>

        <Row>
          <Col className="text-right font-weight-bold">{`${count}/${resultLen}`}</Col>
        </Row>
      </li>
    );
  }
  let sentenceCountSuggestion = null;
  if (sentenceCountAverage <= 13) {
    count++;
    sentenceCountSuggestion = (
      <li className={classnames('list-group-item', 'structureItem')}>
        <Row>
          <Col> Current sentence word count: {sentenceCountAverage}</Col>
        </Row>

        <Row>
          <Col>
            We suggest the average word count per sentencet to be less than 13.
          </Col>
        </Row>

        <Row>
          <Col className="text-right font-weight-bold">{`${count}/${resultLen}`}</Col>
        </Row>
      </li>
    );
  }
  let headerSuggestion = null;
  if (!header || !paragraph) {
    count++;
    headerSuggestion = (
      <li className={classnames('list-group-item', 'structureItem')}>
        <Row>
          <Col>We suggest you have at least 3 x paragraphs/headers.</Col>
        </Row>

        <Row>
          <Col className="text-right font-weight-bold">{`${count}/${resultLen}`}</Col>
        </Row>
      </li>
    );
  }
  let wordCountSuggestion = null;
  if (wordCount < 700) {
    count++;
    wordCountSuggestion = (
      <li className={classnames('list-group-item', 'structureItem')}>
        <Row>
          <Col>Current word count: {wordCount}</Col>
        </Row>

        <Row>
          <Col>
            We suggest you have at least 700 words in your job description.
          </Col>
        </Row>

        <Row>
          <Col className="text-right font-weight-bold">{`${count}/${resultLen}`}</Col>
        </Row>
      </li>
    );
  }
  let structureView = null;
  if (resultLen) {
    structureView = (
      <div className="w-100 mb-3">
        <div className="mb-2 mt-3">
          <FileText />
          <div className="font-weight-bold d-inline-block ml-1">Structure</div>
        </div>
        <Slider {...settings} className="slickContainer">
          {listSuggestion}
          {sentenceCountSuggestion}
          {headerSuggestion}
          {wordCountSuggestion}
        </Slider>
      </div>
    );
  }
  return <>{structureView}</>;
};

export default Structure;
