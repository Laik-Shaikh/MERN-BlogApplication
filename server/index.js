const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const Connection = require('./database/db');
const Router = require('./routes/routes');

dotenv.config();

const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const clusterName = process.env.DB_CLUSTER_NAME;
const databaseName = process.env.DB_DATABASE_NAME;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', Router);
// app.get('/', (req, res) => {
//     res.send("Server is Listing Here")
// })

Connection(username, password, clusterName, databaseName);

app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`))