import React, { Component } from 'react';
import { Container, Form, Button, Col, Row } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import Structure from '../structure';
import Bias from '../bias';
import {
  getSpellingAndGrammar,
  getBias,
  structure
} from '../../utils/checkDescription';
require.context(
  'file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins',
  true,
  /.*/
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html:
        'The boy go too schoo yesterday to contribute to a competitive environment and enforce kindness',
      grammar: null,
      structureRes: {},
      bias: {}
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
    this.setState({ structureRes, bias, grammar, html: newHtml });
  };

  highlightBias = (html, bias) => {
    const biasWords = [
      ...Object.keys(bias.proMen),
      ...Object.keys(bias.proWomen)
    ];

    biasWords.forEach(word => {
      html = html.replace(
        word,
        `<span style="background-color: #f1c40f;">${word}</span>`
      );
    });

    return html;
  };
  onInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { html, structureRes, bias } = this.state;
    console.log(bias);
    return (
      <Container className="mt-4">
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
              <Button color="primary" className="d-block mx-auto mt-3">
                Check out our suggestions
              </Button>
            </Form>
          </Col>
          <Col md={4} className="d-flex align-items-center flex-column">
            <h4 className="d-block">Job Guidance</h4>
            <Structure result={structureRes} />
            <Bias
              result={bias}
              acceptSuggestion={this.acceptBiasSuggestion}
              removeSuggestion={this.removeBiasSuggestion}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
