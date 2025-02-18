const database = require("../../database");
const { collections } = require("../../database");

const create = module.exports;

//Create API to create a Request coming from the user
create.logic = async (req) => {

/*
    Step-1: Get the user ID from the person who is using the application.
    Tech World: Extracting the logged-in user information from the incoming request.
*/
    const { userId } = req.user;

/* 
    Step-2: Taking details like category, requirement, time, and fare from the user's request
    Tech World: Extracting the variable's data from the incoming request body 
*/
    const {haldifunction,mehandifunction,sangeetfunction,marriagefunction} = req.body;

/*
    Step-3: Making a package with the user's ID, current time, and an initial 'approved' status.
    Tech World: Creating a payload object to store information for database insertion. 
*/

    const payload = {
        uid: userId,
        createdAt: new Date().toISOString(),
        status: 'waiting',
        haldifunction:haldifunction,
       mehandifunction: mehandifunction,
       sangeetfunction: sangeetfunction,
       marriagefunction: marriagefunction
    };
    console.log(payload);

/* 
    Step-5: Putting the package into a special storage (database) so that we can remember it later.
    Tech World: Using MongoDB to insert the payload (package of information) into a collection named 'CATALOGES.'
    Additional Info 1: Here 'database.client.collection' refers to a MongoDB collection and 'collections.CATALOGES' holds the collection name
    Additional Info 2: The 'insertOne' method is used to add a single document to the MongoDB collection 
*/

await database.client.collection(collections.CATALOGES).deleteMany();
    return await database.client.collection(collections.CATALOGES).insertOne(payload);
};