const AWS = require('aws-sdk');

function s3_upload(file) {
    return new Promise((resolve, reject) => {
        fetch('/api/s3sign').then((val) => {
            val.json().then((signed) => {
                fetch(signed.uploadURL, { method: "PUT", body: file }).then((res) => {
                    resolve(res.url.split('?')[0]);
                });
            });
        });
    });
    
    /*
    return new Promise((resolve, reject) => {
        const storage = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,            <-- this won't work on browser
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY  <-- this won't work on browser
        })
        try {
            const params = {
                Body: file,
                Key: key,
                ACL: 'public-read',
                Bucket: 'sickbazar'
            }

            //return await storage.upload(params).promise()
            const res = storage.upload( params ).promise().then((res) => {
                resolve(res);
            });

        } catch (err) {
            throw new Error(`S3 upload error: ${err.message}`)
        }
    });
    */
};
module.exports = { s3_upload }