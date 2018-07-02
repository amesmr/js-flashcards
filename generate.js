const fs = require('fs');
const join = require('path').join;
const path = require("path");
const GenerateSchema = require('generate-schema')

const getPath = (fromRoot) => join(__dirname, '..', fromRoot);
const getMCPath = (subFolder) => getPath("js-flashcards/mdFromCPs" + (subFolder ? `/${subFolder}` : ''));

// if this wasn't a one-off script, I'd promisify these and use async / await
const readDir = (path) => fs.readdirSync(path);
const read = (path) => fs.readFileSync(path, {
    encoding: 'utf8'
});
const write = (path, contents) => fs.appendFileSync(path, contents, {
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
let codeSnip = "";

const insertHeadings = filePath => {
    // strip out previous headings and re-insert
    let fileContents = read(filePath).replace(/[\n\r]### [0-9]+[\t ]*[\n\r]+/gm, '');
    // fileContents = fileContents.replace(/-/g, "\n")
    const lines = fileContents.split('\n');
    let headingNumber = 0;
    let dataLine = ""
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
        dataLine = line
        if (dataLine) {
            dataLine = dataLine.toString();
            dataLine.indexOf("#") >= 0 ? dataLine = dataLine.replace(/#/g, "") : null;
            dataLine = dataLine.replace(/\t/g, "");
            dataLine = dataLine.trim();
        }
        if (!line.match(/^[0-9]+/)) {
            if (!dataLine) {
                //do nuthin
            } else if (!printingCode) {
                if (dataLine.indexOf(":question:") >= 0) {
                    question.question = dataLine.slice(11);

                } else if (dataLine.indexOf("Tags:") >= 0) {
                    let subjects = splice(dataLine.slice(dataLine.indexOf("Tags:")), " ")
                    question.subjects = subjects;

                } else if (dataLine.match(/^[0-9]+./)) {
                    if (questionCount > 0) { // starting a new question
                        (typeof (quiz.questions) === "undefined") ? quiz.questions = []: null;
                        quiz.questions.push(question);
                        question = {};
                        // console.log(quiz);
                    } else {
                        quiz.questions = [];
                    }
                    questionCount++;
                    if (dataLine.indexOf("-") >= 0) {
                        let subjects = dataLine.slice(dataLine.indexOf("-")).split(" ");
                        subjects.shift(); // pop off the dash
                        (typeof (quiz.questions) === "undefined") ? quiz.questions = [{}]: null;
                        question.subjects = subjects;
                        dataLine = dataLine.slice(0, dataLine.indexOf("-") - 1);
                    }
                    question.objective = questionCount + ") " + dataLine.slice(2 + questionCount.toString().length - 1);
                } else if (dataLine.match(/^[*]+/)) { // this is an option (a,b,c,etc.)

                        dataLine = dataLine.slice(2);

                    typeof (question.options) === "undefined" ? question.options = []: null;
                    if (optionCount === 4) {
                        optionCount = 0;
                        question.options = [];
                    }
                    if (dataLine.indexOf(":white_check_mark:") >= 0) {
                        question.answer = optionCount;
                        question.options.push(dataLine.slice(0, dataLine.indexOf(":white_check_mark:")).trim());
                    } else {
                        question.options.push(dataLine);
                    }
                    optionCount++;
                }
            } else {
                if (dataLine.indexOf("```") >= 0 || printingCode) {
                    if (printingCode) {
                        if (line.indexOf("```") >= 0) {
                            printingCode = false;
                            question.question = question.question + line;
                            (typeof (quiz.questions) === "undefined") ? quiz.questions = []: null;
                            quiz.questions.push(question);
                            question = {};
                        } else {
                            question.question = question.question + line;
                        }
                    } else {
                        if (!printingCode && !(line.match(/```/g) === 1)) {
                            printingCode = true;
                        }
                        question.question = question.question + line;
                    }
                    codeSnip = codeSnip + " \n " + line;
                }
            }
            return line;
        }
        headingNumber++;
        return `\n### ${headingNumber} \n\n${line}`;
    }).join('\n');
    return quiz;
}

getPaths().forEach((filePath, idx, arr) => {
    const quizObj = insertHeadings(filePath);
    // write(fs.dirname(filePath) + "/quiz" + fileCount + ".json", withPaths);
    var cp = {
        "checkpoint": fileCount,
        "welcome": "Welcome to checkpoint " + fileCount,
        "quiz": quizObj
    }
    allCheckpoints.push(cp);
    if (idx === arr.length - 1) { // last quiz.  Write the file
        write(__dirname + "/checkpoints.json", "");
        write(__dirname + "/checkpoints.json", JSON.stringify(allCheckpoints, null, 4));
        let schema = GenerateSchema.json('course', allCheckpoints);
        write(__dirname + "/checkpoints.schema", JSON.stringify(schema,null,4));
    }
    newFile = true;
});