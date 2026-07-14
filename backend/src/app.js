const express= require("express")
const documentRoutes= require("./routes/documents.routes")
const app = express()

app.use(express.json())


app.get("/",(req,res) =>{
    res.json({
        message:"Resume Api Running"
    })
})

app.use("/api/documents",documentRoutes)




module.exports= app
