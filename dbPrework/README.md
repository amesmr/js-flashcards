note:

the command to import all of the quizes:

1) in mongo, create a database called `flashcards`.
2) In `flashcards`, create a collection called `checkpoints`
3) `mongoimport --db flashcards --collection checkpoints --type json --file checkpoints.json --jsonArray`