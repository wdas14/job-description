import React, { Component } from 'react';
import { Container, Form, Input, Button, Col, Row } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
// // Import TinyMCE
// import tinymce from 'tinymce/tinymce';

// // A theme is also required
// import 'tinymce/themes/silver';

// // Any plugins you want to use has to be imported
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/link';
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
// // Initialize the app
// tinymce.init({
//   selector: 'tiny-mc',
//   plugins: ['paste', 'link']
// });

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      grammar: null,
      structureRes: null,
      bias: null
    };
  }

  handleEditorChange = e => {
    console.log('Content was updated:', e.target.getContent());
  };
  onFormSubmit = async e => {
    e.preventDefault();
    const { html } = this.state;
    const structureRes = structure.init(html);
    const bias = await getBias(html);
    const grammar = await getSpellingAndGrammar(html);
    this.setState({ structureRes, bias, grammar });
  };
  onInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };
  render() {
    console.log(this.state);
    const { html } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.onFormSubmit}>
              <Input
                type="textarea"
                name="html"
                id="exampleText"
                value={html}
                onChange={this.onInputChange}
              ></Input>
              <Button>Done</Button>
            </Form>
          </Col>
          <Col>PlaceHolder</Col>
        </Row>
        <Row>
          <Col>
            <Editor
              id="tiny-mc"
              initialValue="<p>This is the initial content of the editor</p>"
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
