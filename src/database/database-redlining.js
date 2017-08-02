
var databaseTools = require('./database-tools');

var COLLECTION_REDLINING = "redlinings";

class DatabaseRedlining {

  constructor(database) {
    this.database = database;
  }

  getCollection() {
    return this.database.getMongoDatabase().collection(COLLECTION_REDLINING);
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
      let translateY = this.getQueryValue(query, 'translateY');
      let filter = {
        projectId: projectId
      };
      if (pageTblObjectId !== undefined) {
        filter.PageTblObjectId = parseInt(pageTblObjectId);
      }

      redlinings.find(filter).toArray((err, data) => {
        if (err) {
          reject(err);
        }
        data = databaseTools.convertObjects(data);
        
        data.forEach(r => {
          r.y = translateY - r.y
        });

        resolve(data);
      });
    })
  }
}

module.exports = DatabaseRedlining;
