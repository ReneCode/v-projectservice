
var databaseTools = require('./database-tools');

var COLLECTION = "functions";

class DatabaseFunction {

  constructor(database) {
    this.database = database;
  }

  getCollection() {
    return this.database.getMongoDatabase().collection(COLLECTION);
  }

  getFunctions(projectId, query) {
    return new Promise((resolve, reject) => {
      var functions = this.getCollection();
      if (!functions) {
        reject("functions not found");
      }

      let filter = databaseTools.getFilter(['Properties.Val'], query.q);
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
