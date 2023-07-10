/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains[word]) {
        chains[word].push(nextWord);
      } else {
        chains[word] = [nextWord];
      }
    }

    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let words = [];

    let start = this.words[Math.floor(Math.random() * this.words.length)];
    words.push(start);

    while (words.length < numWords) {
      let lastWord = words[words.length - 1];
      let nextWords = this.chains[lastWord];
      let nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];

      if (nextWord === null) {
        break;
      }
      words.push(nextWord);
    }
    return words.join(" ");
  }
}

module.exports = MarkovMachine

// let mm = new MarkovMachine("now the backend features work. the sphinx of black quartz has judged my vow.")
// console.log(mm.makeText())