const mongoose = require('mongoose');

const Connection = async(username, password, clusterName, databaseName) => {
    const URL = `mongodb+srv://${username}:${password}@${clusterName}.6ha089u.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, {useNewUrlParser: true});
        console.log("Database is connected");
    } catch(error) {
        console.log("Connection Failed with Database");
    }
}

module.exports =  Connection;