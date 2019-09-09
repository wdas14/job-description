import React, { Component } from 'react';
import { Container, Form, Button, Col, Row } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import JobGuidance from '../job-guidance';
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
    console.log(e);
    this.setState({ html: e.target.getContent() });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const { html } = this.state;
    const structureRes = structure.init(html);
    const bias = getBias(html);
    const grammar = await getSpellingAndGrammar(html);
    const newHtml = this.highlightBias(html, bias);
    console.log('newHTML', newHtml);
    this.setState({ structureRes, bias, grammar, html: newHtml });
    // this.handleEditorChange({
    //   traget: {
    //     getContent: () => newHtml
    //   }
    // });
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
    console.log(html);
    return (
      <Container className="mt-4">
        <Row>
          <Col md={8}>
            <Form onSubmit={this.onFormSubmit}>
              <Editor
                id="tiny-mc"
                value={html}
                init={{
                  // selector: 'tiny-mc',
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
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
            <JobGuidance structureRes={structureRes} bias={bias} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
