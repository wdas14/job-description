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
  let count = 0;
  const resultLen = Object.keys(result).length;

  let header = false;
  let paragraph = false;
  if (structure) {
    header = structure.header;
    paragraph = structure.paragraph;
  }
  let listSuggestion = null;
  if (listPercentage <= 33 || listPercentage >= 45) {
    count++;
    listSuggestion = (
      <li className={classnames('list-group-item', 'structureItem')}>
        <Row>
          <Col className="font-weight-bold">
            Current list percentage: {listPercentage}
          </Col>
        </Row>

        <Row>
          <Col>
            We suggest that 1/3 of your job description should be bullet
            pointed.
          </Col>
        </Row>

        <Row>
          <Col className="ignoreButton" color="link">
            Ignore
          </Col>
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
        <Row className="font-weight-bold">
          <Col> Current sentence word count: {sentenceCountAverage}</Col>
        </Row>

        <Row>
          <Col>
            We suggest the average word count per sentencet to be less than 13.
          </Col>
        </Row>

        <Row>
          <Col className="ignoreButton" color="link">
            Ignore
          </Col>
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
          <Col className="font-weight-bold">
            We suggest you have at least 3 x paragraphs/headers.
          </Col>
        </Row>

        <Row>
          <Col className="ignoreButton" color="link">
            Ignore
          </Col>
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
          <Col className="font-weight-bold">
            Current word count: {wordCount}
          </Col>
        </Row>

        <Row>
          <Col>
            We suggest you have at least 700 words in your job description.
          </Col>
        </Row>

        <Row>
          <Col className="ignoreButton" color="link">
            Ignore
          </Col>
          <Col className="text-right font-weight-bold">{`${count}/${resultLen}`}</Col>
        </Row>
      </li>
    );
  }
  let structureView = null;
  if (Object.keys(result).length) {
    structureView = (
      <div className="w-100 mb-3">
        <ul className="list-group">
          <li className="list-group-item border-0">
            <FileText />
            <div className="font-weight-bold d-inline-block ml-1">
              Structure
            </div>
          </li>
          <Slider {...settings} className="slickContainer">
            {listSuggestion}
            {sentenceCountSuggestion}
            {headerSuggestion}
            {wordCountSuggestion}
          </Slider>
        </ul>
      </div>
    );
  }
  return <>{structureView}</>;
};

export default Structure;
