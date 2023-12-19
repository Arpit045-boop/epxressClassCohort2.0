const express = require('express');

const app = express();
app.use(express.json());
const user = [
    {
        name:"John",
        kidneys:[
            {
                healthy:false
            },
        ]
    }
]
app.get("/",function(req,res){
    const johnKidney = user[0].kidneys;
    const numberOfKidny = johnKidney.length;
    let HealthyKidney = johnKidney.filter(kidney => kidney.healthy); 
    const numberOfHealthyKidney = HealthyKidney.length;
    const numberOfUnhealthyKidney = numberOfKidny - numberOfHealthyKidney;
    res.json({
          numberOfKidny,
          numberOfHealthyKidney,
          numberOfUnhealthyKidney      
    })    
})

app.post('/',function(req,res){
    const isHealthy = req.body.isHealthy;
    user[0].kidneys.push({
        healthy:isHealthy
    })
    res.json({
        msg:"Done!!"
    })
})

app.put('/',function(req,res){
    for(let i=0;i<user[0].kidneys.length;i++){
        user[0].kidneys[i].healthy = true
    }
    res.json({
        msg:"done..."
    })
})
function IsatleastOneUnhealthyKidny(){
    let atleastOneUnhealthyKidny = false;
    for(let i=0;i<user[0].kidneys.length;i++){
        if(!user[0].kidneys[i].healthy){
            atleastOneUnhealthyKidny = true;
        }
    }
    return atleastOneUnhealthyKidny;
}

app.delete('/',function(req,res){
    if(IsatleastOneUnhealthyKidny()){
        const newKidney = [];
        for(let i=0;i<user[0].kidneys.length;i++){
            if(user[0].kidneys[i].healthy){
                newKidney.push({
                    healthy:true
                })
            }
        }
        user[0].kidneys = newKidney;
        res.json({msg:"Done!!"})
    }
    else{
        res.status(411).json({msg:"You have not bad kidney"});
    }
    
})


app.listen(3000);