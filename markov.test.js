const MarkovMachine = require("./markov");

const text = "sphinx of black quartz judge my vow";

describe("MarkovMachine", () => {
  test("chains are created properly", () => {
    const machine = new MarkovMachine(text);
    expect(machine.chains).toBeDefined();
    expect(machine.chains["judge"]).toContain("my");
  });

  test("generated text starts with a word from the input text", () => {
    const machine = new MarkovMachine(text);
    const generatedText = machine.makeText(10);
    const firstWord = generatedText.split(" ")[0];
    expect(machine.words).toContain(firstWord);
  });

  test("generated text has the correct number of words", () => {
    const machine = new MarkovMachine(text);
    const generatedText = machine.makeText(5);
    const generatedWords = generatedText.split(" ");
    expect(generatedWords.length).toBeLessThanOrEqual(5);
  });
});