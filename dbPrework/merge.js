const fs = require('fs');
const join = require('path').join;
merge = () => {
  let cps = fs.readFileSync(__dirname + "/checkpoints.json");
  let cps2 = fs.readFileSync(__dirname + "/checkpoints2.json");
  cps = JSON.parse(cps);
  cps2 = JSON.parse(cps2);
  for (let i = 0; i < cps.length -1; i++) {
    cps[i].quiz.title = cps[i].quiz.title;
    // below loop test should be cps not cps2, but, Trilogy doesn't have a README
    // file for the Python module(last one)
    for (let j = 0; j < cps2[i].quiz.questions.length; j++) {
      if ((typeof cps2[i] != "undefined") && (typeof cps2[i].quiz.questions[j] != "undefined")) {
        cps[i].quiz.questions[j].description = cps2[i].quiz.questions[j].description;
        cps[i].quiz.questions[j].curriculum = cps2[i].quiz.questions[j].curriculum;
      } else {
        cps[i].quiz.questions[j].description = "???";
        cps[i].quiz.questions[j].curriculum = "???";
      }
    }
  }
  // const all = allCheckpoints.merge(cps);
  fs.writeFileSync(__dirname + "/merged.json", "");
  fs.writeFileSync(__dirname + "/merged.json", JSON.stringify(cps, null, 4));
}
merge();