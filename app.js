const { response } = require('express');
const express = require('express');
const fetch = require('node-fetch');
const reload = require('reload')

const app = express();
const port = process.env.PORT || 2000;

var temp;
var sta;
var chk;
var ct;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));
//const url = "https://api.openweathermap.org/data/2.5/find?q=pune&units=metric&appid=7985c6feb7e61d9f7b7560c1db28bdc7";

 app.get('/getdata',(req, res) => {

  let city = req.query.city;
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&APPID=7985c6feb7e61d9f7b7560c1db28bdc7";
  
  
   const getData = async(event) => {
      
      if(city === ""){
         console.log("enter city");
      }
      else{
         try{
            const data = await fetch(url);
            const rdata = await data.json();
            const ardata = [rdata];
            
            temp = ardata[0].main.temp;
            ct = city;
            chk = ardata[0].main.temp;
            sta = ardata[0].weather[0].main;
           
            
         }
         catch(err){
            console.log(err);
         }
      }
   };
   getData();
   if(temp !=null ){
      globalThis.setTimeout(() => {
         res.render('index',{city: ct,title: 'welcome',temp: temp,sta: sta,a: 'hello'});
           
        }, 1000);

   }
   else{
      //getData();
     
     globalThis.setTimeout(() => {
      res.render('index',{city: ct,title: 'welcome back',temp: temp,sta: sta});
        
     }, 1000);
   } 
//res.render('index',{city: city,title: 'welcome',temp: temp,sta: sta});
});


app.get('/',(req, res) => {
   res.render('index',{city: ct,title: 'welcome first',temp: temp,sta: sta,a: 'hello'});

});
 app.get('/weather',(req, res) => {
    res.render('weather',{ title: 'weather'  });

 });

app.listen(port);
