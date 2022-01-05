const AWS = require('aws-sdk');

export async function s3_upload(file) {
    const val = await fetch('/api/s3sign')
    const signed = await val.json()
    const res = await fetch(signed.uploadURL, { method: "PUT", body: file })
    return res.url.split('?')[0];
    
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