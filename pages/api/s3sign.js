import { s3 } from '../../services/s3'
import { random_string } from '../../services/helper'

export default async function handler(req, res) {
    const URL_EXPIRATION_SECONDS = 300
    const randomID = parseInt(Math.random() * 10000000)
    const Key = `${randomID}.jpeg`

    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKETNAME,
        Key,
        Expires: URL_EXPIRATION_SECONDS,
        ContentType: 'image/jpeg',
        ACL: 'public-read',
    }

    console.log('Params: ', s3Params)
    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

    res.json({
        uploadURL: uploadURL,
        Key
    })
}
