const app=require("express")()
const nodeCache=require("node-cache")
const cache=new nodeCache({stdTTL:10});


app.get("/",(req,res)=>{
    if(cache.has("poison")){
        console.log(`Existing cache found for this reuest:  ${cache.get("poison")}`);
        if((cache.get("poison")).includes("alert(1)")){
            res.send(`<h3>Congrulations! You have successfully solved the lab</h3><div> Thank you for accessing ${cache.get("poison")} Unfortunately, the site is currently under maintainance</div> `)
            cache.del("poison")
        }else{
            res.send(`Thank you for accessing ${cache.get("poison")}. Unfortunately, the site is currently under maintainance`)
        }
    }else{
        cache.set("poison",req.headers.host)
        console.log("Cache set to: ",req.headers.host);
        res.send(`Thank you for accessing ${encodeURIComponent(req.headers.host)} Unfortunately, the site is currently under maintainance`)
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