/** Command-line tool to generate Markov text. */

const MarkovMachine = require("./markov");
const axios = require("axios");
const fs = require("fs/promises");

async function doIt() {
  const [type, source] = process.argv.slice(2);

  if (type === "file") {
    try {
      const text = await fs.readFile(source, "utf8");
      const markov = new MarkovMachine(text);
      console.log(markov.makeText());
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
      process.exit(1);
    }
  } else if (type === "url") {
    try {
      const response = await axios.get(source);
      const text = response.data.replace(/(<([^>]+)>)/gi, "");
      const markov = new MarkovMachine(text);
      console.log(markov.makeText());
    } catch (error) {
      console.error(`Error fetching URL: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.error("Invalid type. Use file or url.");
    process.exit(1);
  }
}

doIt();