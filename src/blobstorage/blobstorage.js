
var azure = require("azure-storage");




class BlobStorage {
    connect(connectionString) {
        return new Promise((resolve, reject) => {
            try {
                this.blobService = azure.createBlobService(connectionString);
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    getKey(projectId, filename) {
        return `${projectId}-${filename}`;
    }

    getContainerName(tenantId) {
        let name = 'devcontainer';
        if (tenantId) {
            name = name + `-${tenantId}`;
        }
        return name;
    }

    getBlob(containerName, key) {
        return new Promise((resolve, reject) => {
            this.blobService.getBlobToText(containerName, key, (err, content, blob) => {
                if (err) {
                    reject(err);
                }
                resolve(content);
            })

        })
    }

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


    // existsContainer(containerName) {
    //     this.blobService.getBlobProperties()
    // }

};

module.exports = new BlobStorage();
