// fs library for reading/writing file

const fs = require('fs');


//To Read command from terminal we access it via process.argv 
//Many utility libraries/packages are available to help in reading command line arguments. like yarg, commandLineArgs etc.
//here using command-line-args

const commandLineArgs = require('command-line-args'); 

//command-line-args library need an object definition of data it expect to recive via argument. 
//here define all the command that we would pass from command line 
// i-e node app.js --name=abx 
//for the purpose of this program we need to collect the name, order, payment information and allow user to exit or confirm the order

const optionsDefinitions = [
    {name:'name',type:String},
    {name:'order',type:String},
    {name:'payment',type:Number},
    {name:'exit',type:Boolean}
];

const options = commandLineArgs(optionsDefinitions)

//data has to be stored in the database for consistency. let's  use local db or json file that save name, order and patment information. 
// read the db.json file synchronisously. 
let getJson = fs.readFileSync('db.json');
let data = JSON.parse(getJson);


//function to write data to the json file. 
const saveIt = (newData) =>{
    const toString = JSON.stringify(newData);
    fs.writeFileSync('db.json',toString);
} // end of funciton



//now check the arguments recived from command line 
if(options.name){
    //replace the value in data onject with options.name (recived form command)
    data.name = options.name;

    console.log(`Hello, ${options.name}, we are serving CAKE,PIZZA and SALAD`)//for testing 

    saveIt(data);

} else if(options.order){
    data.order = options.order;

    console.log(`Ok ${data.name}, that would be $25, you will pay with....`)
    saveIt(data);
    
} else if(options.payment){
    data.payment = options.payment;

    console.log(`Your change is ${options.payment - 25}, thanks for eating at ABC!, now type --exit to get the order`)
    saveIt(data);
}else if(options.exit){
    console.log(data)
    console.log(`Thanks you for visiting us `)

    data.name = '';
    data.order = '';
    data.payment = '';
    saveIt(data);
}else {
    console.log(`Hello, please enter your name`)
}
