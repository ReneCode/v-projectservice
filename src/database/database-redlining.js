
var databaseTools = require('./database-tools');

var COLLECTION_REDLINING = "redlining";

class DatabaseRedlining {

  constructor(database) {
    this.database = database;
  }

  getCollection() {
    return this.database.collection(COLLECTION_REDLINING);
  }
  
  getQueryValue(query, name) {
    name = name.toLowerCase()
    if (query) {
      for (var prop of Object.keys(query)) {
        if (prop.toLowerCase() === name) {
          return query[prop];
        }
      }
    }
    return undefined;
  }

  getRedlinings(projectId, query) {
    return new Promise((resolve, reject) => {
      var redlinings = this.getCollection();
      if (!redlinings) {
        reject("redlinings not found");
      }

      let pageTblObjectId = this.getQueryValue(query, 'pageTblObjectId');
      let filter = {
        ProjectId: projectId
      };
      if (pageTblObjectId !== undefined) {
        filter.PageTblObjectId = parseInt(pageTblObjectId);
      }

      redlinings.find(filter).toArray((err, data) => {
        if (err) {
          reject(err);
        }
        data = databaseTools.keysToLowerCase(data);
        data = databaseTools.updateObjectIds(data);
        data = databaseTools.convertProperties(data);
        data = databaseTools.convertRedlinings(data);

        resolve(data);
      });
    })
  }
}

module.exports = DatabaseRedlining;
