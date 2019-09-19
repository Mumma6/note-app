const argv = require("yargs");
const notes = require("./notes");

argv.version("1.1.0");

// Create add command
argv.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => notes.addNote(argv.title, argv.body)
});

// Create remove command
argv.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => notes.removeNote(argv.title)
});

// Create list command
argv.command({
  command: "list",
  describe: "Show a list of the notes",
  handler: () => notes.listNotes()
});

// Create read command
argv.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Read note by title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => notes.readNote(argv.title)
});

argv.parse();
