const config = {
    admin: true,
    timeFormat: "DD-MM-YYYY HH:mm:ss",

    firebaseDbConfig: {
        "type": "service_account",
        "project_id": "miproyectofirebase-cc9dd",
        "private_key_id": "219465b1b84032f93379c253ec7c5e3942fa7919",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeeV1inKqj88Id\nMVJzujLvDgdbINQJEFqY+Ybweg3pDuPQbFBXVpRJpD+YWi+gpcktmKH9gU6gx1li\nFFQjrePvuJObnsl5dmr5SrHRBLaM7nhwyPoAEre6JC/C/EO+9uQyQmKYH39MfSYZ\n3NdYahOu4hbRfAU8oREjNL4qGUfxD3Jn7p4splA83bZUHRmOvmAWrdQsEevuJBse\namdKdfvpTx/Ial26pgJgCmz651waUuZ0aw7OdfsKfCH7NrWsG6Zqm9XxgEX/HSbr\ndvixa1NaMCUmA5pWgiN0NdNjhjUaDPpMtOWqMxgkosP21wUoVPNrZvY98vq1ZnjU\nHndkmJzZAgMBAAECggEACerzhrfiUAdx1wzeqaJ2DJL2r+PSkUymNtuq78LbuwG1\nDTayIn0nI6K1Xi4KvAWUHRfnz2s3xgUj2WkHSQJZeQe2qS8bUdAw6rAbh8bBO/my\nrPBPAREq0WnxWUUbYkimSGTyMa4K8/kDGOxCx+Q/nhrFLdASrdQws+DZo93YLERf\nd/WI8YD8oN0gZiJ9I6X9c40X2iJlIPeGNOmGx6jUcLil7x1XyvVgkUB6KPdcOMXW\n93PAU4Cm7ke7hFjgPVNFBawjHt34MS/o9aVbGejj8k4DkCfDdbm+gJ8OYXJbdouJ\nH65D/7CSdGz4SxRGUzIKOoE5QZbLMP+YbD3nNrSzHwKBgQDUY45obh3+RlxJq9TS\n2ePVEjNZX6UqKv6LwZqr7IJIUeHm2GPnM3pW076PH9FNQ9WSWRXQ40mGAxTc0YJP\ndIKmaV4kujm707dbI2JMH/vixnzq/U50P29ZenWvx557fdGKjQREjneXcHR1cDQv\n4aGXxx8x2DXdEXhvjv0+2cqgjwKBgQC/A7hg/wtC1hh8hqWiOzJLQby1lJQAD/C2\nwEnOVHU1efXvdRRLQTj+jbKr7SeF03VjAYqfHbNvslHnwIpDUGBV7KI5+DLIA6HU\nzBZAEns21G2cNEvwabMfNppIlyWNzNq+STseoUx0kGPQoSCjkEQ7DsPtipemCF7r\nuePeWBDQFwKBgHZ8/CvCkzUSZ9Yp6Neg+3wZZVBNDcXSqqOpZPLZRW23UMIKouGP\nVIcwJjWO2KO0XmgBDyy0QIZlHbR7palSJLlWO1FeG2twF/Decq5pgYrolTQ8ERLF\neQeATDu+r+nRLZ+QQHtGx+1SrYX/DP5RcGdOjVaveo1Ue84xBZOUyXh9AoGBALrV\nArUtAXDARHcYpE3IJOtjQxdAWnqtHL9D2W0NQw+pWRp8o/rvsrWZF1f+wReuuzS5\nv0LfJDFuc5qAwzwQFAo3SH32/ISSuOmRLXpCGW6J3SRaKqTeXit7lvDFlh/abWKN\n8luFXWjuChN4ZppVc8doK8/eLXJi4aUjz3QdI2TFAoGAR/v10ygebGssEZqexeG5\no1Qm9Fmz1sAQuiCSWPRqhyfnutyViYtpZ2v4jUEQhLwSpUZQdOujedUco6ITJtyj\nfS0S2HYjQHKbx8StVzc7CNo7oCCae9xZ/2HaHOTCD84HOwtOhZ+G//uCiqScDxGU\nkOpxoP68udD87uUolKiJ2po=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-pfe1n@miproyectofirebase-cc9dd.iam.gserviceaccount.com",
        "client_id": "105037445710309145588",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pfe1n%40miproyectofirebase-cc9dd.iam.gserviceaccount.com"
    },
    
    mongooseURL:  "mongodb+srv://coderhouse:coderhouse@miprimercluster.jrovqqz.mongodb.net/ecommerce?retryWrites=true&w=majority"
    
    
}

const Error = {
    notFound: (res) =>
        res.status(404).json({ error: -10, description: "Item not found" }),

    unauthorized: (req, res) =>
        res.status(401).json({
            error: -1,
            description: `Unauthorized execution of ${req.method} on ${req.hostname}${req.originalUrl}`,
        }),

    notComplete: (res) =>
        res.status(400).json({
            error: -20,
            description: "Task could not be completed"
        }),

    notImplemented: (req, res) =>
        res.status(401).json({
            error: -2,
            description: `Route ${req.hostname}${req.originalUrl} method ${req.method} not implemented `,
        }),

    cartNotFound: (res) =>
        res.status(404).json({ error: -10, description: "Cart not found" }),

};

export {
    config,
    Error
}