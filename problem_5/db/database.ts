import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

// Set up the database connection

const db = new sqlite3.Database("./db/database.db", (err: Error | null) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");

        // Read and execute the SQL file
        const sqlFilePath = path.resolve("./db/database.sql");
        const sql = fs.readFileSync(sqlFilePath, "utf-8");

        db.exec(sql, (execErr: Error | null) => {
            if (execErr) {
                console.error("Error executing SQL file:", execErr.message);
            } else {
                console.log("Database schema ensured.");
            }
        });
    }
});

export default db;