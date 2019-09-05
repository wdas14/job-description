import React, { Component } from 'react';
import { Container, Form, Input, Button, Col, Row } from 'reactstrap';
import {
  getSpellingAndGrammar,
  getBias,
  structure
} from '../../utils/checkDescription';
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
      </Container>
    );
  }
}

export default Main;
