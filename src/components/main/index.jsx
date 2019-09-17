import React, { Component } from 'react';
import { Container, Form, Button, Col, Row } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import classnames from 'classnames';
import Structure from '../structure';
import Bias from '../bias';
import {
  getSpellingAndGrammar,
  getBias,
  structure
} from '../../utils/checkDescription';
import './styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// require.context(
//   'file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins',
//   true,
//   /.*/
// );

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html:
        'The boy go too schoo yesterday to contribute to a competitive environment and enforce kindness .',
      grammar: null,
      structureRes: {},
      bias: {},
      showJobGuidance: false
    };
  }

  handleEditorChange = e => {
    this.setState({ html: e.target.getContent() });
  };

  removeBiasSuggestion = wordToReplace => {
    const { bias } = this.state;
    const newBiasObj = { ...bias };
    if (newBiasObj.proMen[wordToReplace]) {
      delete newBiasObj.proMen[wordToReplace];
    }
    if (newBiasObj.proWomen[wordToReplace]) {
      delete newBiasObj.proWomen[wordToReplace];
    }
    this.setState({ bias: newBiasObj });
  };
  acceptBiasSuggestion = (wordToReplace, suggestion) => {
    const { html } = this.state;
    const pattern = new RegExp(
      `<span style="background-color: #f1c40f;">${wordToReplace}</span>`
    );
    const updatedHtml = html.replace(pattern, suggestion);
    this.removeBiasSuggestion(wordToReplace);
    this.setState({ html: updatedHtml });
  };
  onFormSubmit = async e => {
    e.preventDefault();
    const { html } = this.state;
    const structureRes = structure.init(html);
    const bias = getBias(html);
    const grammar = await getSpellingAndGrammar(html);
    const newHtml = this.highlightBias(html, bias);
    this.setState({
      structureRes,
      bias,
      grammar,
      html: newHtml,
      showJobGuidance: true
    });
  };

  highlightBias = (html, bias) => {
    const biasWords = [
      ...Object.keys(bias.proMen),
      ...Object.keys(bias.proWomen)
    ];

    biasWords.forEach(word => {
      html = html.replace(
        word,
        `<span style="background-color: #ffb0f2;">${word}</span>`
      );
    });

    return html;
  };
  onInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { html, structureRes, bias, showJobGuidance } = this.state;
    let jobGuidanceView = null;
    if (showJobGuidance) {
      jobGuidanceView = (
        <Col
          md={4}
          className={classnames(
            'd-flex align-items-center flex-column',
            'jobDescriptionContainer'
          )}
        >
          <h4 className="d-block mt-2">Job Guidance</h4>
          <Bias result={bias} acceptSuggestion={this.acceptBiasSuggestion} />
          <Structure result={structureRes} />
        </Col>
      );
    }
    return (
      <Container className="mt-4">
        <Row>
          <Col>
            <h3>Job Description</h3>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Form onSubmit={this.onFormSubmit}>
              <Editor
                id="tiny-mc"
                value={html}
                init={{
                  browser_spellcheck: true,
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                    // 'tinymcespellchecker en'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                  content_css: [
                    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                    '//www.tiny.cloud/css/codepen.min.css'
                  ]
                }}
                onChange={this.handleEditorChange}
              />
              <Button color="secondary" className="d-block mx-auto mt-3">
                Check out our suggestions
              </Button>
            </Form>
          </Col>
          {jobGuidanceView}
        </Row>
      </Container>
    );
  }
}

export default Main;
