const uuidv4 = require('uuid/v4');

var bodyParser = require("body-parser");

var express = require('express');
var app = express();
var Sequelize =require('sequelize');
var cookieParser = require('cookie-parser')
var fs= require("fs")
var kafka = require("kafka-node");
// const server = require("./static")

const Op = Sequelize.Op;
var Item={};
var login='1';
var password='1';

var KafkaService={};











var sequelize=new Sequelize("test","root","newpass",{
    host:"localhost",
    port:3306,
    dialect:'mysql',
    operatorsAliases: Op,
});

sequelize.authenticate()
.then((res)=>{
    console.log("conn")
})
.catch(err=>{
    console.log("disc")
})


function checkCookie(cookies){
    if(cookies && cookies.myCook=="123"){
        console.log("checkCookie success")
        return true
    }
    return false
}


function initDB(){
    Item = sequelize.define('cloud', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        name:Sequelize.STRING,
        description: Sequelize.TEXT,
        year: Sequelize.INTEGER,
        imgurl: Sequelize.TEXT
    },{
        freezeTableName: true,
        createdAt: false,
        updatedAt:false,
    });

        sequelize.sync()
            .then((res) => {
                console.log("sync succ");
                Item.create({
                    name: 'monet',
                    description:'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
                    year:2007,
                    imgurl:"customUrl"
                });
            })
            .catch(err => {
                console.log("sync err")
            })

}

app.use(cookieParser())
app.use(express.static('../client/dist'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Accept", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.set('views', './views')
app.set('view engine', 'pug');

app.get('/data', function(req, res) {
   


    // console.log("req.body parsed", JSON.parse(req.body))
    console.log("req.body", req.body)
    console.log("in GET")
    var obj={};
    let mas=[];
    Item.findAll({})
    .then( (data)=> {
        // if(data)console.log("res",data);
        data.forEach((item,i)=>{
            mas.push(item.dataValues)
            //obj[i]=item.dataValues;
        })
        res.send({ mas });
    });


});

app.post('/', function(req, res) {
    console.log("-------Post-------")
    let id=req.body.id;
    console.log('Cookies: ', req.cookies)
    // if(!checkCookie(req.cookies)){
    //     res.statusCode = 401;
    //     res.send();
    //     return;
    // }
    if(id) {
        Item.findById(id).then(project => {
            // project will be an instance of Project and stores the content of the table entry
            // with id 123. if such an entry is not defined you will get null

            project.name = req.body.name,
            project.description = req.body.description,
            project.year=req.body.year,
            project.imgurl=req.body.imgUrl,
            // console.log("req.body",req.body)

                project.save({fields: ['name', 'description','year','imgurl']}).then(() => {
                    // title will now be 'foooo' but description is the very same as before
                })
        })
    }else{
        sequelize.sync()
            .then((res) => {
                console.log("sync succ");
                Item.create({
                    name:req.body.name,
                    description:req.body.description,
                    year:req.body.year,
                    imgurl:req.body.imgUrl,
                }).then(task => {
                })
            })
            .catch(err => {
                console.log("sync err")
            })
    }
    res.send();

});

app.delete('/', function(req, res) {
    // console.log("req.body parsed", JSON.parse(req.body))
    console.log("---delete---")
    let id=req.body.delId;
    console.log("id", id)
    if(!checkCookie(req.cookies)){
        res.statusCode = 401;
        res.send();
        return;
    }

    Item.findById(id).then(el => {
        el.destroy();
    })
    res.send();

});

app.put('/', function(req, res) {

    console.log('Cookies: ', req.cookies)
    if(!checkCookie(req.cookies)){
        res.statusCode = 401;
        res.send();
        return;
    }

    console.log("in put")
    let id=req.body.id;
    console.log("income id",id)
        Item.findById(id).then(project => {
            // project will be an instance of Project and stores the content of the table entry
            // with id 123. if such an entry is not defined you will get null

            project.name = req.body.name,
            project.description = req.body.description,
            project.year=req.body.year,
            project.imgurl=req.body.imgUrl,
             console.log("req.body",req.body)

                project.save({fields: ['name', 'description','year','imgurl']}).then(() => {
                    // title will now be 'foooo' but description is the very same as before
                })
        })
res.send();

});

app.get('/rr', function(req, res) {
    // console.log("req.body parsed", JSON.parse(req.body))
    console.log("req.body", req.body)
    console.log("in GET")
    setTimeout(() => {
        console.log("send data")
        res.send({ "some": uuidv4() });
    }, 6000)

});

app.post('/login', function(req, res) {
  console.log("try to log",req.body)
  console.log(req.body.login)
  console.log()
  if(req.body.login==login && req.body.password==password){
      console.log("set cooc")
    res.cookie('myCook',123, { maxAge: 900000, httpOnly: true });
  }else{
    res.statusCode = 401;
  }
  res.send();

});
app.post('/logoff', function(req, res) {
    console.log("clear cookie")


    res.clearCookie("myCook");
    res.send();
  
  });
// app.post('/generate', function(req, res) {
//     console.log("generate")
//     res.send();
// });

app.post('/generate', function (req, res) {
    console.log("generate")
    let id=req.body.id;
    console.log("id", id)

    // var name, year, description, image=0;

 


    Item.findById(id).then(el => {
        console.log("el",el.dataValues)
        el=el.dataValues;
        var obj1={};
        obj1=fs.readFile('lang.json', 'utf8', (err,data)=>{
            obj1=JSON.parse(data)
            console.log(obj1.ru.name)
            var { name, year, description, image} = obj1.ru

            var o=obj1.ru;
            console.log({...o})

            console.log(name, year, description, image)
    res.render('index', {...o,nameText:el.name, descriptionText: el.description,yearText:el.year,url:el.imgurl});

        })

    })
  });
  





  app.get('/test', function(req, res) {

  // Create a new payload
  const record = [
    {
        topic: "webevents.dev",
        messages: "test msg",
        attributes: 1 /* Use GZip compression for the payload */
    }
];

//Send record to Kafka and log result/error
producer.send(record, callback);

KafkaService.sendRecord();

    res.send("test");
});






app.listen(3000, function() {
    initDB();
    console.log('listening on port 3000!');







var client = new kafka.Client("localhost:2181", "my-client-id", {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});
 
var producer = new kafka.HighLevelProducer(client);

console.log("------------------------------")

producer.on("ready", function() {
    console.log("Kafka Producer is connected and ready.");
});
 
// For this demo we just log producer errors to the console.
producer.on("error", function(error) {
    console.error(error);
});
 
 KafkaService = {
    sendRecord: ( callback = () => {}) => {
        // if (!userId) {
        //     return callback(new Error(`A userId must be provided.`));
        // }
 
        // const event = {
        //     id: uuidv4(),
        //     timestamp: Date.now(),
        //     userId: userId,
        //     sessionId: sessionId,
        //     type: type,
        //     data: data
        // };
 
        // const buffer = new Buffer.from(JSON.stringify(event));
 
        // Create a new payload
        const record = [
            {
                topic: "topic1",
                messages: "test mes",
                attributes: 1 /* Use GZip compression for the payload */
            }
        ];
 
        //Send record to Kafka and log result/error

        console.log("send record")

        producer.send(record, callback);
    }
};






KafkaService.sendRecord();





});

