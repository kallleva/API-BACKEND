import Express from "express";
const app = Express();

app.get("/", (req, res) => {
    res.send("hello novo");1
})

app.listen(8080, function(){
    console.log("servidpr rodando")
})