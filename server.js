const { resolve } = require("path");

const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World from Vandit!')
})

app.get('/persons/', (req, res) => {
    res.send('Hello World from Vandit1!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

'use strict';

const fs = require('fs');

let student = {
    name: 'Mike11',
    age: 23,
    gender: 'Male',
    department: 'English',
    car: 'Honda'
};

let data = JSON.stringify(student, null, 2);
//fs.writeFileSync('MyData.json', data);

// fs.writeFile('MyData.json', data, (err) => {
//     if (err) throw err;
//     console.log('Data written to file');
// });

// fs.readFile('MyData.json', (err, data) => {
//     if (err) throw err;
//     let student = JSON.parse(data);
//     console.log(student);
// });

// console.log('This is after the read call');

async function requireJson(path) {
    return await JSON.parse(fs.readFileSync(resolve(__dirname, path), "utf8"));
}
//requireJson("./MyData.json").then((js) => console.log(js));

app.get("/readDataFromFile", (req, res) => {
    requireJson("./MyData.json").then((resData) => res.send(resData));
});

app.post("/writeDataToFile", (req, res) => {
    console.log(req.body);
    requireJson("MyData.json").then((resdata)=>{
        resdata.push(req.body);
        return resdata;
    }).then((data)=>{
        fs.writeFile("MyData.json",JSON.stringify(data,null,2),(err)=>{
            if(err) throw err;
            console.log("Data written to file");
            res.send(data)
        })
    })
});

app.delete("/deleteDataFromFile/:name", (req, res) => {
    var nameToDelete=req.params.name;
    console.log(nameToDelete)
    requireJson("MyData.json").then((resdata)=>{
        return resdata.filter(x=>x.name!=nameToDelete);
    }).then((data)=>{
        fs.writeFile("MyData.json",JSON.stringify(data,null,2),(err)=>{
            if(err) throw err;
            console.log("Data written to file");
            res.send(data);
        })
    })
});
app.get("/getDataById/:id", (req, res) => {
    var dataId=req.params.id;
    requireJson("MyData.json").then((resdata)=>{
        var objData= resdata.find(x=>x.id==dataId);
        res.send(objData);
    })
});

app.put("/updateDataToFile", (req, res) => {
    var nameToDelete=req.params.name;
    requireJson("MyData.json").then((resdata)=>{
        let arr= resdata.filter(x=>x.name!==nameToDelete);
        return arr.concat(req.body);
    }).then((data)=>{
        fs.writeFile("MyData.json",JSON.stringify(data,null,2),(err)=>{
            if(err) throw err;
            console.log("Data written to file");
            res.send(data);
        })
    })
});

let count = 0;
const store = {} //{0:{name:"Tom",age:34}};
app.post("/", (req, res) => {
    count++;
    console.log('In Post');
    store['${count}'] = req.body;
    console.log("store", store);
    res.send(200, store);
});

