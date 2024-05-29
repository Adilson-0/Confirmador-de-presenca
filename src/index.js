// THIRDPARTY IMPORTS

import "dotenv/config";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// LOCAL IMPORTS

import { random, isValidEmail } from './utils.js';
import { Presence, addOrUpdatePresence  } from './models/models.js';

// PATHS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SETTINGS

const app = express();
app.use(express.static("staticfiles"));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

// ENVIROMENT SETTINGS

const PORT = process.env.PORT;
const URI = process.env.DATABASE_URI;
let HASHES = new Set();

// VIEWS


app.get("/", (req, res) => {
    res.status(301).redirect("/form")
})


app.get("/form", (req, res) => {
    const hash = random();
    HASHES.add(hash);

    res.render(`../staticfiles/templates/index`, {
        code: hash
    });
});


app.post("/process", (req, res) => {
  
    const { code, nome, matricula, email, turma } = req.body;

    if (!code || typeof code !== 'string' || !HASHES.has(code)) {
        res.status(422).send({message: 'Invalid or missing code'}).end();
        return
    } else if (!nome || typeof nome !== 'string') {
        res.status(422).send({message: 'Invalid or missing nome'}).end();
        return
    } else if (!matricula || typeof matricula !== 'string' || matricula.length != 12) {
        res.status(422).send({message: 'Invalid or missing matricula'}).end();
        return
    } else if (!email || !isValidEmail(email)) {
        res.status(422).send({message: 'Invalid or missing email'}).end();
        return
    } else if (!turma || typeof turma !== 'string') {
        res.status(422).send({message: 'Invalid or missing turma'}).end();
        return
    }

    console.log({ code, nome, matricula, email, turma })
    HASHES.delete(code);
    console.log("CODE HIT", code);
    
    
    try {
        addOrUpdatePresence(new Date(), new Map([[matricula, nome]]));
        res.status(201).send({message: 'Successfully registered'}).end();
        return
    } catch (error) {
        res.status(400).send({message: 'Error adding/updating presence'}).end();
        return
    }

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}}`);
});