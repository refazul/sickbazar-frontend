const AWS = require('aws-sdk');

function s3_upload(file, key) {
    return new Promise((resolve, reject) => {
        const storage = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
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
};
module.exports = { s3_upload }