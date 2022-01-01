require('dotenv').config();
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

async function s3_upload(file, key) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            const params = {
                Bucket: 'sickbazar', // pass your bucket name
                Key: key ? key : file, // file will be saved as testBucket/contacts.csv
                Body: JSON.stringify(data, null, 2)
            };
            s3.upload(params, function (s3Err, data) {
                if (s3Err) throw s3Err
                resolve(data.Location);
            });
        });
    });
};
module.exports = { s3_upload }

// link = await s3_upload('services/s3.js')