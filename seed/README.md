This is a hack, but its quick...

Make sure `mongod` is running.

```bash
# load decks
$ mongoimport --db wonky --collection decks --drop --jsonArray --file decks.json
```

In new terminal window, issue:

```bash
$ mongo
> use wonky
> db.decks.find({})
```

The output of the command above will list all decks:

```
{ "_id" : ObjectId("57505f4f8f59a3914e9678fd"), "name" : "Big O" }
{ "_id" : ObjectId("57505f4f8f59a3914e9678fe"), "name" : "JavaScript" }
{ "_id" : ObjectId("57505f4f8f59a3914e9678ff"), "name" : "Sublime Shortcuts" }
{ "_id" : ObjectId("57505f4f8f59a3914e967900"), "name" : "Math" }
```

**Now, update the `cards.json` to use the cooresponding deck id (listed above).**

Next...

```bash
# insert cards
$ mongoimport --db wonky --collection cards --drop --jsonArray --file cards.json
```

In terminal window running mongo shell, issue:

```bash
# lists all cards you just inserted
> db.cards.find({})
```
