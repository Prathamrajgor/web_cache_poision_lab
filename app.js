const app=require("express")()
const nodeCache=require("node-cache")
const cache=new nodeCache({stdTTL:15});


app.get("/",(req,res)=>{
    if(cache.has("landing")){
        console.log(`Existing cache found this reuest:  ${cache.get("landing")}`);
        res.send(`Thank you for accessing ${cache.get("landing")}`)
    }else{
        cache.set("landing",req.headers.host)
        console.log("Cache set to: ",req.headers.host);
        res.send(`Thank you for accessing ${encodeURIComponent(req.headers.host)}`)
    }
});
app.listen(5000,(err)=>{
    if(err){
        console.log("Error starting server");
    }
    else{
        console.log("Server started on PORT 5000");
    }
})