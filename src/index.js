import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";
import routes from "./routes";
import config from "config";


//To configure the jwtPrivateKey, run this in your terminal:
//(for MAC or LINUX) $ export pacome_jwtPrivateKey=SECURE_KEY
//(for WINDOWS [CMD]) $ set pacome_jwtPrivateKey=SECURE_KEY
// where SECURE_KEY can be any string you want.

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.'); //to avoid the error, refer to the comments above this function definition.
    process.exit(1);
}

const port = process.env.PORT || 5000;

const app = express();
    
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
    console.log("Server has started! go ahead and SQLIZE!");
});

export default app;
