var Nightmare = require("nightmare");
var expect = require("chai").expect;

describe("JS-Flashcards", function() {

    this.timeout(30000);
    it("should select JavaScript and open the flashcards", function(done) {

        Nightmare({ show: true })
            .goto("http://flashcards-and-quizes.herokuapp.com")
            .click("input[value='FlashCards']")
            .click("input[name='JavaScript']")
            .click("a.studyBtn")
            .evaluate(function() {
                return document.querySelector("code.question")
            })
            .then(function(flashcard) {
                console.log(flashcard);
                expect(flashcard).to.not.equal(undefined);
                done();
            });
            
    });
})