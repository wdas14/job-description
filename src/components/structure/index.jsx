import React from 'react';
import classnames from 'classnames';
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
  let listSuggestion = null;
  if (listPercentage <= 33 || listPercentage >= 45) {
    listSuggestion = (
      <li className={classnames('list-group-item', 'structureItem')}>
        <div className="font-weight-bold">
          Current list percentage: {listPercentage}
        </div>
        <div>
          We suggest that 1/3 of your job description should be bullet pointed.
        </div>
        <div className="ignoreButton" color="link">
          Ignore
        </div>
      </li>
    );
  }
  let sentenceCountSuggestion = null;
  if (sentenceCountAverage <= 13) {
    sentenceCountSuggestion = (
      <li className={classnames('list-group-item', 'structureItem')}>
        <div className="font-weight-bold">
          Current sentence word count: {sentenceCountAverage}
        </div>
        <div>
          We suggest the average word count per sentencet to be less than 13.
        </div>
        <div className="ignoreButton" color="link">
          Ignore
        </div>
      </li>
    );
  }
  let headerSuggestion = null;
  if (!header || !paragraph) {
    headerSuggestion = (
      <li className={classnames('list-group-item', 'structureItem')}>
        <div className="font-weight-bold">
          We suggest you have at least 3 x paragraphs/headers.
        </div>
        <div className="ignoreButton" color="link">
          Ignore
        </div>
      </li>
    );
  }
  let wordCountSuggestion = null;
  if (wordCount < 700) {
    wordCountSuggestion = (
      <li className={classnames('list-group-item', 'structureItem')}>
        <div className="font-weight-bold">Current word count: {wordCount}</div>
        <div>
          We suggest you have at least 700 words in your job description.
        </div>
        <div className="ignoreButton" color="link">
          Ignore
        </div>
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
            {wordCountSuggestion}
            {listSuggestion}
            {sentenceCountSuggestion}
            {headerSuggestion}
          </Slider>
        </ul>
      </div>
    );
  }
  return <>{structureView}</>;
};

export default Structure;
