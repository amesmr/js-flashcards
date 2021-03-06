const Nightmare = require("nightmare");
const expect = require("chai").expect;



describe("JS-Flashcards", function() {

  this.timeout(30000);

  it("should select JavaScript and open the flashcards", function(done) {
    Nightmare({ show: true, })
      .goto("http://localhost:3000")
      .click("input[value='FlashCards']")
      .click("input[name='JavaScript']")
      .click("a.studyBtn")
      .evaluate(function() {
        return ("code.question");
      })
      .end()
      .then(function(flashcard) {
        console.log(flashcard);
        expect(flashcard).to.not.equal(undefined);
        done();
      });

  });
});

describe("Check the flashcard functionality", function() {
  this.timeout(45000);

  it("Should open the JavaScript flashcards, flip the card over and reveal the correct answer", function(done) {
    Nightmare({ show: true, })
      .goto("http://localhost:3000")
      .click("input[value='FlashCards']")
      .click("input[name='JavaScript']")
      .click("a.studyBtn")
      .wait(".flipper")
      .click(".flipper")
      .wait(".arrowNext")
      .click(".arrowNext")
      .wait(".flipper")
      .click(".flipper")
      .wait(".arrowNext")
      .click(".arrowNext")
      .wait(".flipper")
      .click(".flipper")
      .wait(".answerReveal")
      .evaluate(function() {
        return document.body.querySelector(".answerReveal").innerHTML;
      })
      .end()
      .then(answer => {
        console.log(answer);
        expect(answer).to.equal("quotes");
        done();
      });

  });
});

describe("Take a quiz!", function() {
  this.timeout(40000);

  it("Should take a quiz and present the correct results", function(done){
    Nightmare({ show: true, })
      .goto("http://localhost:3000")
      .wait("input[value=\"Quiz\"]")
      .click("input[value=\"Quiz\"]")
      .click("input[name=\"JavaScript\"]")
      .click("a.studyBtn")
      .wait("input[value=\"var\"]")
      .click("input[value=\"var\"]")
      .click("input[value=\"alerts\"]")
      .click("input[value=\"quotes\"]")
      .click("input[value=\"console.log\"]")
      .click("input[value=\"6\"]")
      .click("input[value=\"a prompt\"]")
      .click("input[value=\"document.write\"]")
      .click("input[value=\"making decisions\"]")
      .click("input[value=\"parentheses\"]")
      .click("input[value=\"all of the above\"]")
      .click("input[value=\"index\"]")
      .click("input[value=\"cat\"]")
      .click("input[value=\"length\"]")
      .click("input[value=\"for loops\"]")
      .click("input[value=\"=\"]")
      .click("input[value=\"iterator\"]")
      .click("input[value=\"9\"]")
      .click("input[value=\"page.hit\"]")
      .click("input[value=\"event.key\"]")
      .click("input[value=\"document.getElementById\"]")
      .click("input[value=\"push\"]")
      .click("input[value=\"functions\"]")
      .click("input[value=\"arguments\"]")
      .click("input[value=\"charAt(0)\"]")
      .click("input[value=\"[0, 2, 4, 6, 8]\"]")
      .click("input[value=\"run\"]")
      .click("input[value=\"toLowerCase()\"]")
      .click("input[value=\"0, 1, 2, 3, 4\"]")
      .click("input[value=\"66\"]")
      .click("input[value=\"Submit\"]")
      .wait(".score")
      .evaluate(function() {
        return document.body.querySelector(".score").innerHTML;
      })
      .end()
      .then(function(quizresults) {
        console.log(quizresults);
        expect(quizresults).to.equal("You scored 62%");
        done();
      });

  });
});
