const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const path = require('path');

const app = express();
const db = new sqlite3.Database("tasks.db");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Ustvari tabelo, če ne obstaja
db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, completed INTEGER, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, deleted INTEGER DEFAULT 0)");

// Pridobi vse naloge
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks WHERE deleted = 0", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Pridobi izbrisane naloge
app.get("/tasks/deleted", (req, res) => {
    db.all("SELECT * FROM tasks WHERE deleted = 1 ORDER BY timestamp DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Dodaj novo nalogo
app.post("/tasks", (req, res) => {
    const { text } = req.body;
    db.run("INSERT INTO tasks (text, completed) VALUES (?, 0)", [text], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

// Označi nalogo kot opravljeno/neopravljeno ali posodobi besedilo naloge
app.put("/tasks/:id", (req, res) => {
    const { text } = req.body;
    if (text) {
        db.run("UPDATE tasks SET text = ? WHERE id = ?", [text, req.params.id], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        });
    } else {
        db.run("UPDATE tasks SET completed = NOT completed WHERE id = ?", [req.params.id], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        });
    }
});

// Dodaj korensko pot
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Označi nalogo kot izbrisano
app.delete("/tasks/:id", (req, res) => {
    db.run("UPDATE tasks SET deleted = 1 WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// Trajno izbriši nalogo
app.delete("/tasks/forever/:id", (req, res) => {
    db.run("DELETE FROM tasks WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

app.listen(3000, () => console.log("Server teče na http://localhost:3000"));
