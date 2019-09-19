const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => "Your notes...";

// lägger till title och body obj i notes arrayen, parametern kommer ifrån argv. Find är bättre än filter i detta läge då filter letar igenom hela arrayen medan find stannar ifall den hittar en match
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  // Finns inga dublicates
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green("New note added!"));
  } else {
    console.log(chalk.red("Title already exist!"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const newNotes = notes.filter(note => note.title !== title);

  if (notes.length === newNotes.length) {
    console.log(chalk.red.inverse("No note found!"));
  } else {
    console.log(chalk.green.inverse(`Title: ${title} was removed`));
    saveNotes(newNotes);
  }
};

// Tar emot en array och sparar den som ett json obj i rätt fil
const saveNotes = notes =>
  fs.writeFileSync("notes.json", JSON.stringify(notes));

// const saveNotes = notes => {
//   const dataJSON = JSON.stringify(notes);
//   fs.writeFileSync("notes.json", dataJSON);
// };

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  console.log(chalk.green.inverse("Your notes:"));
  const notes = loadNotes();
  notes.forEach(note => {
    console.log(chalk.magenta.bold(note.title));
  });
};

const readNote = title => {
  const notes = loadNotes();

  const match = notes.find(note => note.title === title);

  if (match) {
    console.log(chalk.magenta.bold(match.title));
    console.log(match.body);
  } else {
    console.log(chalk.red("No title found!"));
  }
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote
};
