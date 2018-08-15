import readYaml from 'read-yaml';
import mongoose from 'mongoose';

module.exports = class Connection {

    constructor() {
        this.config_path = './app/config/database.yaml';
        this.prefix_url = 'mongodb://';
        this.db = null;

        this.connect(); 
    }

    readData() {
        var config = readYaml.sync(this.config_path);

        if (config) {
            this.db_url = `${this.prefix_url}${config.database.user}:${config.database.password}${config.database.url}`;
        } else {
            console.log('Error trying read the database.yaml');
        }
    }

    connect() {
        this.readData();
        
        mongoose.connect(this.db_url, { useNewUrlParser: true })
                .then(() => console.log(`Successfully database connection.`),
                      (err) => {
                          console.log("Something went wront trying to connect to the database.");
                          console.log(`Error: ${err.code}. Message: ${err.errmsg}`);
                    });
    }
}