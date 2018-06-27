const fs = require('fs');
const join = require('path').join;

const getPath = (fromRoot) => join(__dirname, '..', fromRoot);
const getMCPath = (subFolder) => getPath("js-flashcards/mdFromCPs" + (subFolder
  ? `/${subFolder}`
  : ''));

// if this wasn't a one-off script, I'd promisify these and use async / await
const readDir = (path) => fs.readdirSync(path);
const read = (path) => fs.readFileSync(path, {encoding: 'utf8'});
const write = (path, contents) => fs.appendFileSync(path, contents, {encoding: 'utf8'});

let quizes = 2;

const getPaths = () => {
  const folders = readDir(getMCPath());

  const recursivePaths = folders.map(fol => {

    const getContentsRecursively = (folderPath) => {
      const contents = readDir(getMCPath(folderPath));

      const recursiveContents = contents.map((path) => {
        if (path.match(/\.[a-zA-Z]+$/)) {
          return join(folderPath, path);
        }

        return getContentsRecursively(join(folderPath, path));
      });

      return recursiveContents.reduce((a, b) => a.concat(b), []);
    };

    const fileNames = getContentsRecursively(fol);

    return fileNames.reduce((a, b) => a.concat(b), [])
  });

  return recursivePaths.reduce((a, b) => a.concat(b), []).map(path => getMCPath(path));
};

let questionCount = 0;
let optionCount = 0;
let quiz = [{}];
let question = {};

const insertHeadings = filePath => {
  // strip out previous headings and re-insert
  let fileContents = read(filePath).replace(/[\n\r]### [0-9]+[\t ]*[\n\r]+/gm, '');
  fileContents = fileContents.replace(/-/g, "\n")
  const lines = fileContents.split('\n');
  let headingNumber = 0;
  let tmpLine = ""
  const transformLines = lines.map((line) => {
    if ((questionCount === 0) && (typeof(quiz.title) === "undefined")) {
      quiz.title = line.slice(3).trim();
    }
    tmpLine = line.match(/\w+/);
    if (tmpLine != null) {
      tmpLine = tmpLine.input; // match returns an array
      tmpLine = tmpLine.toString();
      tmpLine.indexOf("#") >= 0 ? tmpLine = tmpLine.replace(/#/g, "") : null;
      tmpLine = tmpLine.replace(/\r/g, ""); //I can't believe trim doesn't do this
      tmpLine = tmpLine.replace(/\t/g, "");
      tmpLine = tmpLine.trim();
    }
    if (!line.match(/^[0-9]+/)) {

      if (tmpLine === null) {
        // do nothing
      } else if (tmpLine.indexOf("`") >= 0) {
        tmpLine = tmpLine.replace(/`/g, "")
        let tmpAry = tmpLine.split(" ");
        question.subjects = [];
        for (let i = 0; i < tmpAry.length; i++) {
          question.subjects.push(tmpAry[i])
        }

      } else if (tmpLine.indexOf(":") === 0) {
        question.question = tmpLine.slice(2);
      } else if (tmpLine.charAt(0) === "*") { // this is an option (a,b,c,etc.)
        tmpLine = tmpLine.slice(2);
        typeof (question.options) === "undefined" ? question.options = [] : null;
        optionCount === 4 ? optionCount = 0 : null;
        if (tmpLine.indexOf(":white_check_mark:") >= 0) {
          question.answer = optionCount;
        }
        question.options.push(tmpLine.slice(0, tmpLine.indexOf(":white_check_mark:")));
        optionCount++;
      } else if (tmpLine.match(/[0-9]+./)) {
        if (questionCount > 0) {// starting a new question
          quiz.questions.push(question);
          question = {};
          console.log(quiz);
        } else {
          quiz.questions = [];
        }
        questionCount++;
        question.goal = questionCount + ") " + tmpLine.slice(3);
      }
      return line;
    }

    headingNumber++;

    return `\n### ${headingNumber} \n\n${line}`;
  }).join('\n');
  return transformLines;
}

getPaths().forEach((filePath) => {
  const withPaths = insertHeadings(filePath);
  write(filePath, withPaths);
  write("/tmpfile.json", JSON.stringify(quiz));
});

// function quizCheck(thisQuiz) {
//   if (thisQuiz.)
// }