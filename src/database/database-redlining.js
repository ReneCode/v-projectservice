
var databaseTools = require('./database-tools');

var COLLECTION_REDLINING = "redlinings";

class DatabaseRedlining {

  constructor(database) {
    this.database = database;
  }

  getCollection() {
    return this.database.collection(COLLECTION_REDLINING);
  }
/*
  getPages(projectId, query) {
    return new Promise((resolve, reject) => {
      var pages = this.getCollection();
      if (!pages) {
        reject("pages not found");
      }

      let filter = { ProjectId: projectId };
      if (query.meta == 'count') {
        pages.count(filter, (err, data) => {
          resolve(data);
        });
      } else {
        pages.find(filter).toArray((err, data) => {
          if (err) {
            reject(err);
          }
          data = databaseTools.keysToLowerCase(data);
          data = databaseTools.updateObjectIds(data);
          data = databaseTools.convertProperties(data);

          resolve(data);
        });
      }
    })
  }

  getPage(projectId, pageId) {
    return new Promise((resolve, reject) => {
      var pages = this.getCollection();
      if (!pages) {
        reject("pages not found");
      }
      let filter = { ProjectId: projectId, _id: pageId };
      pages.findOne(filter, (err, data) => {
        if (err) {
          reject(err);
        }
        data = databaseTools.keysToLowerCase(data);
        data = databaseTools.updateObjectIds(data);
        data = databaseTools.convertProperties(data);

        resolve(data);
      });
    })
  }
*/
}

module.exports = DatabasePage;
