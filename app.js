const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const exhbs=require('express-handlebars');
const dbo=require('./db');
const { ObjectId } = require('mongodb');


app.use(bodyparser.urlencoded({extended:true}));
app.engine('hbs',exhbs.engine({layoutsDir:"views/",extname:"hbs",defaultLayout:"main"}))
app.set('view engine','hbs');
app.set('views','views')

app.get('/',async (req,res)=>{

    let database=await dbo.getdatabase();
       const collection=database.collection('details');
       const cursor=collection.find({});
       const readdet=await cursor.toArray();
    let message=''
    
    switch(req.query.status){
        case '1':
            message='created successfully';
            break;
        case '2':
             message='updated successfuly';
            break;

    }

    let edit_id,edit_det;
    if(req.query.editid){
        edit_id=req.query.editid;
        edit_det= await collection.findOne({_id:new ObjectId(edit_id)})
    }

    if(req.query.deleteid){
        
        await collection.deleteOne({_id: new ObjectId(req.query.deleteid)})
        return res.redirect('/?status=3')
    }
    res.render('main',{message,readdet,edit_id,edit_det});
})


app.post('/createdet',async(req,res)=>{
       let database=await dbo.getdatabase();
       const collection=database.collection('details');
       let details={name:req.body.name,proffesion:req.body.proffesion}
       await collection.insertOne(details);
       return res.redirect('/?status=1')   
})

app.post('/update/:edit_id',async(req,res)=>{
    let database=await dbo.getdatabase();
       const collection=database.collection('details');
       let details={name:req.body.name,proffesion:req.body.proffesion}
       let edit_id=req.params.edit_id;
       collection.updateOne({_id:new ObjectId(edit_id)},{$set:details})
       return res.redirect('/?status=2')

})
app.listen(5000,()=>{
    console.log("listening")
})
