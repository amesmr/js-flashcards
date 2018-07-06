## Mongo


### 1 

1. What is MongoDB - `noSQL`, `MongoDB`, `vocab`

    :question: MongoDB is a very popular ___ database.
    * relational
    * SQL type
    * noSQL :white_check_mark:
    * JSON


### 2 

1. MongoDB storage format - `bson`, `vocab`

    :question: MongoDB stores data in ___ format.
    * BSON :white_check_mark:
    * table
    * JSON
    * schema


### 3 

1. MongoDB storage terminology - `collection`, `document`, `vocab`

    :question: MongoDB databases are composed of one or more ___, each of which is composed of one or more ___.
    * tables, rows
    * collections, documents :white_check_mark:
    * schemas, tables
    * stores, fields


### 4 

1. Running MongoDB - `mongod`, `tech-knowledge`

    :question: ___ must be running in order to be able to connect to any local Mongo database.
    * mongo
    * mongo shell
    * mongod :white_check_mark:
    * terminal


### 5 

1. Selecting databases - `use`, `vocab`

    :question: The mongo shell command to switch to a database called books is:
    * switch books
    * select books
    * use books :white_check_mark:
    * db.books


### 6 

1. Checking selected database - `db`, `vocab`

    :question: To see the name of the currently selected database in the mongo shell, we use the command:
    * show current
    * list dbs
    * db.current
    * db :white_check_mark:


### 7 

1. Adding data - `insert`, `vocab`

    :question: The ___ method is used to add a new document.
    * insert() :white_check_mark:
    * add()
    * document()
    * object()


### 8 

1. Locating data - `find`, `vocab`

    :question: A database may be queried using the ___ method.
    * locate()
    * find() :white_check_mark:
    * query()
    * data()


### 9 

1. Modifying data - `update`, `vocab`

    :question: The ___ method is used to modify a document.
    * modify()
    * data()
    * change()
    * update() :white_check_mark:


### 10 

1. Deleting data - `remove`, `vocab`

    :question: The ___ method is used to delete documents.
    * update()
    * delete()
    * remove() :white_check_mark:
    * erase()


### 11 

1. Removing collections - `drop`, `vocab`

    :question: A collection can be removed with the ___ method.
    * remove()
    * drop() :white_check_mark:
    * removeCollection()
    * dropCollection()


### 12 

1. Removing databases - `dropDatabase`, `vocab`

    :question: A database can be removed and its data deleted using the ___ method.
    * destroyDatabase()
    * dropDatabase() :white_check_mark:
    * removeDatabase()
    * eraseDatabase()


### 13 

1. ObjectId details - `_id`, `ObjectId`, `vocab`

    :question: Each document has a unique ObjectId stored in the ___ field that acts as a ___.
    * ID, foreign key
    * _id, primary key :white_check_mark:
    * _ID, primary key
    * id, foreign key


### 14 

1. Query results ordering - `sort`, `vocab`

    :question: The order of query results is specified using the ___ method.
    * order()
    * result()
    * find()
    * sort() :white_check_mark:


### 15 

1. Connecting with MongoJS - `mongojs`, `tech-knowledge`

    :question: For making a connection, the MongoJS NPM package requires the ___ and the ___.
    * database URL, collection names :white_check_mark:
    * package, connections file
    * database ObjectId, document names
    * login ID, password


### 16 

1. Mongoose - `mongoose`, `models`, `tech-knowledge`

    :question: One of the major benefits of Mongoose is to permit developers to define ___ for Mongo data.
    * models :white_check_mark:
    * compatibility
    * stores
    * archives


### 17 

1. Query response handling - `mongoose`, `callback`, `promise`, `tech-knowledge`

    :question: By default, Mongoose uses ___ to handle what happens after performing a query. This can be switched to ___ for cleaner code.
    * responses, data
    * callback functions, promises :white_check_mark:
    * XML, AJAX
    * objects, JSON


### 18 

1. Defining the model - `mongoose`, `schema`, `vocab`

    :question: A data model can be created using the Mongoose ___ constructor.
    * Schema :white_check_mark:
    * Collection
    * Model
    * Record


### 19 

1. Combining collections - `mongoose`, `populate`, `vocab`

    :question: Collections can be combined, similarly to MySQL joins, using the ___ Mongoose method.
    * join()
    * combine()
    * populate() :white_check_mark:
    * attach()


### 20 

1. Linking ObjectIds to model - `mongoose`, `ref`, `vocab`

    :question: With Mongoose, the ___ property can be used to link ObjectIds to a particular model.
    * link
    * foreignKey
    * ref :white_check_mark:
    * _id
