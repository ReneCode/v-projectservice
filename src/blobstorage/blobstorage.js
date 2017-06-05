
var azure = require("azure-storage");

const connectionString = process.env.DV_BLOB_STORAGE_CONNECTION_STRING;

let blobService = azure.createBlobService(connectionString);


class BlobStorage {

    getBlobs(containerName, prefix, continuationToken, maxResults) {
        return new Promise((resolve, reject) => {
            let options = {
                maxResults: maxResults || 1000
            };
            blobService.listBlobsSegmentedWithPrefix(containerName, prefix, continuationToken, options, (err, result, response) => {
                if (err) {
                    reject(err);
                }
                const data = {
                    entries: result.entries,
                    continuationToken: result.continuationToken
                };
                resolve(data);
            });
        });
    }


};

module.exports = new BlobStorage();
