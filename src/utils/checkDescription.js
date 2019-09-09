import sw from './stopword';
import bias from './bias';
const re = {
  p: /<p>(.*?)<\/p>/g,
  li: /<li>(.*?)<\/li>/g,
  h1: /<h1>(.*?)<\/h1>/g,
  sentence: /[.!?]+/gm,
  markup: /<[^>]*>?/gm
};

export const cleanMarkup = string =>
  string.replace(re.markup, '').replace(/\n/g, ' ');

export const getBias = text => {
  const words = cleanMarkup(text).split(' ');
  const response = {
    proWomen: {},
    proMen: {}
  };
  for (let x = 0; x < words.length; x++) {
    const curr = words[x];
    if (bias.proMen[curr]) {
      response.proMen[curr] = bias.proMen[curr];
    }
    if (bias.proWomen[curr]) {
      response.proWomen[curr] = bias.proWomen[curr];
    }
  }
  return response;
};
// export function findBias(objBiases, words, type) {
//   let found = [];
//   const biases = Object.keys(objBiases);
//   for (let x = 0, xMax = biases.length; x < xMax; x++) {
//     let biasKey = biases[x];
//     let bias = objBiases[biasKey];
//     for (let i = 0, iMax = words.length; i < iMax; i++) {
//       let word = words[i];
//       const b = {};
//       word = word.replace(/[\n\r]+/g, '');
//       word = word.replace(/\./g, '');
//       if (word === biasKey) {
//         b[type] = [word, bias];

//         found.push(b);
//       }
//     }
//   }
//   return found;
// }
// export function getBias(input) {
//   const cleanHtml = cleanMarkup(input);
//   const output = [];
//   const words = cleanHtml.split(' ');
//   const cleanWords = sw.removeStopwords(words);
//   Object.keys(biases).forEach(function(key) {
//     const bias = biases[key];
//     const found = findBias(bias, cleanWords, key);
//     output.push(found);
//   });
//   return output;
// }
export function getSpellingAndGrammar(input) {
  const cleanHtml = input;
  return fetch('http://localhost:4000/check-grammar', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ text: cleanHtml })
  })
    .then(function(response) {
      return response.json().then(function(spelling) {
        return spelling;
      });
    })
    .catch(function(e) {
      console.log(e);
    });
}
export const structure = (() => {
  const wordCount = html =>
    cleanMarkup(html)
      .split(' ')
      .filter(word => word !== '').length;

  const sentenceCountAverage = html => {
    const sentenceTotalArr = cleanMarkup(html)
      .split(re.sentence)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence !== '')
      .map(sentence => sentence.split(' ').length);
    return (
      sentenceTotalArr.reduce((sum, current) => sum + current, 0) /
      sentenceTotalArr.length
    ).toFixed(1);
  };

  const listPercentage = html => {
    return (
      ((html.match(re.li) || [])
        .map(item => cleanMarkup(item).split(' ').length)
        .reduce((sum, current) => sum + current, 0) /
        (html.match(re.p) || [])
          .map(item => cleanMarkup(item).split(' ').length)
          .reduce((sum, current) => sum + current, 0)) *
      100
    ).toFixed(1);
  };

  const structure = html => ({
    header: (html.match(re.h1) || []).length >= 3,
    paragraph: (html.match(re.p) || []).length >= 3
  });

  const init = html => {
    return {
      sentenceCountAverage: sentenceCountAverage(html),
      listPercentage: listPercentage(html),
      wordCount: wordCount(html),
      structure: structure(html)
    };
  };

  return {
    init: init
  };
})();
