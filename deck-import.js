var path = require('path');
var fs = require('fs');

var filePath = path.join(__dirname, process.argv[2]);

var deck = {
  name: '',
  cards: [
  ]
};

var startedAt;
var cardSections = [];

fs.readFileSync(filePath, 'utf8').split('\n').forEach((line, no, file) => {
  var title = line.match(/^# (.+)/);
  if (title) {
    deck.name = title[1];
  }

  if (line.match(/^## Card (\w+)/)) { // card section started
    if (startedAt) {
      throw Error('File could not be parsed.');
    }
    startedAt = no + 1;
  }

  if (line.match(/^-{3,}$/)) { // card section ended
    if (!startedAt) {
      throw Error('File could not be parsed.');
    }
    cardSections.push(file.slice(startedAt, no))
    startedAt = null;
  }
});

cardSections.forEach(cardSection => {
  var card = {};
  cardSection.forEach((line, no, section) => {
    // card property found
    var propStart = line.match(/^### (Question|Answer|Explanation+)/);
    if (propStart) {
      if(propStart[1] === 'Question') {
        // mark the start of the question
        startedAt = no + 1;
      } else if (propStart[1] === 'Answer') {
        // mark the end of a question and the start of an answer
        card.question = {
          text: section.slice(startedAt, no).join('\n')
        };
        startedAt = no + 1;
      } else if (propStart[1] === 'Explanation') {
        // mark the end of an answer and the rest is assumed to be explanation
        card.answer = {
          text: section.slice(startedAt, no).join('\n'),
          explanation: section.slice(no + 1).join('\n'),
        }
      }
    }
  });
  deck.cards.push(card);
});

fs.writeFileSync('deck.json', JSON.stringify(deck));