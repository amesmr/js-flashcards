const fs = require('fs');
const join = require('path').join;
const GenerateSchema = require("generate-schema");


const getPath = (fromRoot) => join(__dirname, '..', fromRoot);
const getMCPath = (subFolder) => getPath("/dbPrework/mdFromCPs" + (subFolder ? `/${subFolder}` : ''));
// if this wasn't a one-off script, I'd promisify these and use async / await
const readDir = (path) => fs.readdirSync(path);
const read = (path) => fs.readFileSync(path, {
  encoding: 'utf8'
});
const write = (path, contents) => fs.writeFileSync(path, contents, {
  encoding: 'utf8'
});

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
let allCheckpoints = [];
let quiz = [{}];
let question = {};
let fileCount = 0;
let printingCode = false;
let lastQuestion = 0;
let firstOnce = true;
let newFile = true;
let quizes = 2;
let code = "";

const insertHeadings = filePath => {
  // strip out previous headings and re-insert
  let fileContents = read(filePath).replace(/[\n\r]### [0-9]+[\t ]*[\n\r]+/gm, '');
  // fileContents = fileContents.replace(/-/g, "\n")
  const lines = fileContents.split('\n');
  let headingNumber = 0;
  let tmpLine = ""
  const transformLines = lines.map((line) => {
    line = line.replace(/\t/g, "  "); // get rid of the tabs
    if (newFile) {
      questionCount = 0;
      fileCount++;
      printingCode = false;
      quiz = {};
      quiz.title = line.slice(3).trim();
      newFile = false
    }
    tmpLine = line
    if (tmpLine) {
      // tmpLine = tmpLine.input; // match returns an array
      tmpLine = tmpLine.toString();
      tmpLine.indexOf("#") >= 0 ? tmpLine = tmpLine.replace(/#/g, "") : null;
      // tmpLine = tmpLine.replace(/\r/g, ""); //I can't believe trim doesn't do this
      tmpLine = tmpLine.replace(/\t/g, "");
      tmpLine = tmpLine.trim();
    }
    if (!line.match(/^[0-9]+/)) {
      if (!tmpLine) {
        //do nuthin
      } else if ((tmpLine.indexOf(":question:") >= 0) && !printingCode) {
        question.question = tmpLine.slice(11);

      } else if ((tmpLine.indexOf("Tags:") >= 0) && !printingCode) {
        let subjects = splice(tmpLine.slice(tmpLine.indexOf("Tags:")), " ")
        question.subjects = subjects;
      } else if (tmpLine.match(/^[0-9]+./) && !printingCode) {
        if (questionCount > 0) { // starting a new question
          (typeof (quiz.questions) === "undefined") ? quiz.questions = []: null;
          quiz.questions.push(question);
          question = {};
          // console.log(quiz);
        } else {
          quiz.questions = [];
        }
        questionCount++;
        if (tmpLine.indexOf("-") >= 0) {
          if (!tmpLine.indexOf("```") >= 0) {
            tmpLine = tmpLine.replace(/[`]+/g, "");
          }
          let subjects = tmpLine.slice(tmpLine.indexOf("-")).split(" ");
          subjects.shift();
          (typeof (quiz.questions) === "undefined") ? quiz.questions = [{}]: null;
          question.subjects = subjects;
          tmpLine = tmpLine.slice(0, tmpLine.indexOf("-") - 1);
        }
        question.number = questionCount;
        question.objective = tmpLine.slice(2 + questionCount.toString().length - 1).trim();
      } else if (((tmpLine.charAt(0) === "*") || (tmpLine.indexOf(":white_check_mark:") >= 0) && !printingCode)) { // this is an option (a,b,c,etc.)
        if (tmpLine.charAt(0) === "*") {
          tmpLine = tmpLine.slice(2);
        }
        typeof (question.answers) === "undefined" ? question.answers = []: null;
        if (optionCount === 4) {
          optionCount = 0;
          question.answers = [];
        }
        if (tmpLine.indexOf(":white_check_mark:") >= 0) {
          question.answer = optionCount;
          question.answers.push(tmpLine.slice(0, tmpLine.indexOf(":white_check_mark:")).trim());
        } else {
          question.answers.push(tmpLine);
        }
        optionCount++;
      } else {
        if (tmpLine.indexOf("```") >= 0 || printingCode) {
          if (printingCode) {
            if (line.indexOf("```") >= 0) {
              printingCode = false;
              question.question = question.question + line;
              (typeof (quiz.questions) === "undefined") ? quiz.questions = []: null;
              // quiz.questions.push(question);
              // question = {};
            } else {
              question.question = question.question + line;
            }
          } else {
            if (!printingCode && !(line.match(/```/g) === 1)) {
              printingCode = true;
            }
            question.question = question.question + line;
          }
          code = code + " \n " + line;
        }
      }
      return line;
    }

    headingNumber++;

    return `\n### ${headingNumber} \n\n${line}`;
  }).join('\n');
  return quiz;
}

function logOutput(msg) {
  console.log(msg);
}

getPaths().forEach((filePath, idx, arr) => {
  const quizObj = insertHeadings(filePath);
  // write(filePath, withPaths); console.log(filePath);
  var cp = {
    "checkpoint": fileCount,
    "welcome": "Welcome to checkpoint " + fileCount,
    "quiz": quizObj
  }
  allCheckpoints.push(cp);
  console.log(code);
  console.log(fileCount);
  if (idx === arr.length - 1) { // last quiz.  Write the file
    write(__dirname + "/checkpoints.json", "");
    write(__dirname + "/checkpoints.json", JSON.stringify(allCheckpoints, null, 4));
  }
  newFile = true;
});