note:
To generate the JSON first -
1) `node generateFromMCs`
2) `node geneerateFromReadmes`
3) `node merge`


Now, the command to import all of the quizes:

1) in `mongo` with `mongod` running in a new terminal, create a database called `flashcards`.
2) In `flashcards`, create a collection called `checkpoints`
3) `mongoimport --db flashcards --collection checkpoints --type json --file merged.json --jsonArray`