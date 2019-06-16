const { Client } = require("pg");
const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

const client = new Client({
    database: "patient-allergies"
});

class Allergy {
    constructor(name, severity, patientId) {
      this.name = name;
      this.severity = severity;
      this.patientId = patientId;
    }
  }

app.post("/patient", (req, res) => {
    client.query(
        "INSERT INTO patients (name) VALUES ($1) RETURNING *",
        [req.body.name],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send()
            }
            res.status(201).render("success", { data: 'Patient' });
        }
    )
});

app.post("/allergy", (req, res) => {
    let allergy = new Allergy(req.body.allergy, req.body.severity, req.body.id);
    client.query(
        "INSERT INTO allergies (name, severity, patientId) VALUES ($1, $2, $3) RETURNING *",
        [allergy.name, allergy.severity, allergy.patientId],
        (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).send();
            }
            res.status(201).render("success", { data: 'Allergy'});
        }
      )
});

app.get("/", (req, res) => {
    res.status(200).render('index');
})

app.post("/allergies", (req, res) => {
    client.query("SELECT * FROM allergies WHERE patientId=$1", [req.body.id], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).send();
        }
      
        client.query("SELECT * FROM patients WHERE id=$1", [req.body.id], (err, name) => {
            if(err) {
                console.error(err);
                return res.status(500).send();
            }

            if(name.rows.length === 0) {
                return res.status(404).render('error', { message: "Could not find patient with this ID" })
            }

            if(result.rows.length === 0) {
                return res.status(404).render('error', { message: `No allergies entered for ${name.rows[0].name}` });
            }
            
            res.render('allergies', { data: result.rows, name: name.rows[0].name });
        });
    });
});

client.connect(err => {
    if(err) throw err;
    app.listen(3000, () => console.log('Server running on port 3000'));
});