import express from "express"
import connect from "./Connection/Connect.js"
import dotenv  from "dotenv"
import route from "./Route/Userroute.js"
import cors from "cors"
import path from "path"


dotenv.config()
const app=express()

const __dirname = path.resolve(); // for ES Modules

// Serve React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // or /client/build

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.use(express.json())
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
// Set COOP/COEP headers to allow Google OAuth popups/postMessage
app.use((req, res, next) => {
    // allow popups to communicate back to opener (needed by some OAuth flows)
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    // keep embedder policy permissive (default) so we don't block resources
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
});
app.use(route)


const port=process.env.port 
const mongo_uri=process.env.mongo_uri
async function Connecting() {  
try{
    connect(mongo_uri)
    app.listen(port,()=>{
    console.log(`Server running on Port ${port}`)
})

} 
catch{
    console.log("server not Started")
}
}
Connecting()