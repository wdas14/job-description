import React, { Component } from 'react';
import { Container, Form, Button, Col, Row } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import classnames from 'classnames';
import Structure from '../structure';
import Bias from '../bias';
import Grammar from '../grammar';
import {
  getSpellingAndGrammar,
  getBias,
  structure,
  cleanMarkup
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
      html: `<p><strong>Junir Node Devloper</strong></p>
      <p>Tec partners are working with an early stage start-up in the FinTech / PropTech secto.</p>
      <p>Based in Cntral London (Shoreditch) they have raised several million in funding and are now looking to scale their team.</p>
      <p>Our client is single handedly driving change within the letting market. It is no secret the letting market is expensive and the route too getting onto the property ladder for most is distorted. Enter our client who are driving the cost of letting down.</p>
      <p>To help continue driving and manage this business forward they require an outstanding Node Developer to enter the team. The team is supportive ,&nbsp; and passionate about driving change in the letting market.</p>
      <p>&nbsp;</p>
      <p><strong><em>BENEFITS for the Junior NODE DEVELOPER</em></strong></p>
      <ul>
      <li>Flexible working hours and remote working</li>
      <li>28 days holiday + Bank Holidays</li>
      <li>Share Options</li>
      <li>Competitive Salary</li>
      </ul>`,
      grammar: {},
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
  removeGrammarSuggestion = wordToReplace => {
    const { grammar } = this.state;
    const newGrammarObj = { ...grammar };
    if (newGrammarObj[wordToReplace]) {
      delete newGrammarObj[wordToReplace];
    }

    this.setState({ grammar: newGrammarObj });
  };
  acceptBiasSuggestion = (wordToReplace, suggestion) => {
    const { html } = this.state;
    const pattern = new RegExp(
      `<span style="background-color: #ffb0f2;">${wordToReplace}</span>`
    );
    const updatedHtml = html.replace(pattern, suggestion);
    this.removeBiasSuggestion(wordToReplace);
    this.setState({ html: updatedHtml });
  };
  acceptGrammarSuggestion = (wordToReplace, suggestion) => {
    const { html } = this.state;
    const pattern = new RegExp(
      `<span style="background-color: #e6ffd8;">${wordToReplace}</span>`
    );
    const updatedHtml = html.replace(pattern, suggestion);
    this.removeGrammarSuggestion(wordToReplace);
    this.setState({ html: updatedHtml });
  };
  onFormSubmit = async e => {
    e.preventDefault();
    const { html } = this.state;
    const structureRes = structure.init(html);
    const bias = getBias(html);
    const grammar = await getSpellingAndGrammar(cleanMarkup(html));
    let newHtml = this.highlightBias(html, bias);
    newHtml = this.highlightGrammar(newHtml, grammar);
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
  highlightGrammar = (html, grammar) => {
    const grammarWords = [...Object.keys(grammar)];

    grammarWords.forEach(word => {
      html = html.replace(
        word,
        `<span style="background-color: #e6ffd8;">${word}</span>`
      );
    });
    return html;
  };
  onInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    console.log(this.state.html);
    const { html, structureRes, bias, showJobGuidance, grammar } = this.state;
    let jobGuidanceView = null;
    if (showJobGuidance) {
      jobGuidanceView = (
        <Col md={4}>
          <Row
            className={classnames(
              'justify-content-center',
              'jobSuggestionsHeader'
            )}
          >
            <h4 className="d-block mt-2">Job Guidance</h4>
          </Row>
          <Row
            className={classnames(
              'align-items-center',
              'jobSuggestionsContainer'
            )}
          >
            <Col>
              <Bias
                result={bias}
                acceptSuggestion={this.acceptBiasSuggestion}
              />
              <Grammar
                result={grammar}
                acceptSuggestion={this.acceptGrammarSuggestion}
              />
              <Structure result={structureRes} />
            </Col>
          </Row>
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
