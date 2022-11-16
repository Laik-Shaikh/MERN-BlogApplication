const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const dotenv = require('dotenv');

dotenv.config();

const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const clusterName = process.env.DB_CLUSTER_NAME;
const databaseName = process.env.DB_DATABASE_NAME;

const storage = new GridFsStorage({
    url : `mongodb+srv://${username}:${password}@${clusterName}.6ha089u.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

module.exports = multer({storage});