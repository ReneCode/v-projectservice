
var databaseTools = require('./database-tools');

var COLLECTION = "functions";

class DatabaseFunction {

  constructor(database) {
    this.database = database;
  }

  getCollection() {
    return this.database.getMongoDatabase().collection(COLLECTION);
  }


  getFunctionFilter(q) {
    if (!q) {
      return undefined;
    }
    if (q.indexOf("function:") === 0) {
      const idx = q.indexOf(":");
      return q.substring(idx + 1);
    }
    return q;
  }

  getFunctions(projectId, query) {
    return new Promise((resolve, reject) => {
      var functions = this.getCollection();
      if (!functions) {
        reject("functions not found");
      }

      const filterString = this.getFunctionFilter(query.q);

      let filter = databaseTools.getFilter(['Properties.Val'], filterString);
      filter.ProjectId = projectId;
      functions.find(filter).toArray((err, data) => {
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
}

module.exports = DatabaseFunction;
