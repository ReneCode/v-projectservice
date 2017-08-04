
var databaseTools = require('./database-tools');

var COLLECTION_PAGE = "pages";

class DatabasePage {
  constructor(database) {
    this.database = database;
  }

  getCollection() {
    return this.database.getMongoDatabase().collection(COLLECTION_PAGE);
  }

  getFunctionQuery(q) {
    if (!q) {
      return undefined;
    }
    if (q.indexOf("function:") !== 0) {
      return undefined;
    }

    let idx = q.indexOf(":");
    let functionQuery = q.substring(idx + 1);
    return functionQuery;
  }

  getPagesByFilter(filter, query) {
    return new Promise((resolve, reject) => {
      var pages = this.getCollection();

      if (query.meta === 'count') {
        pages.count(filter, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      } else {
        pages.find(filter).toArray((err, data) => {
          if (err) {
            reject(err);
          }
          data = databaseTools.convertObjects(data);
          resolve(data);
        });
      }
    });
  }

  getPages(projectId, query) {
    return new Promise((resolve, reject) => {
      var pages = this.getCollection();
      if (!pages) {
        reject(new Error("pages not found"));
      }

      if (!query) {
        query = {};
      }
      let functionQuery = this.getFunctionQuery(query.q);

      let pageIdList = [];
      if (functionQuery) {
        return this.database.getFunctions(projectId, { q: functionQuery })
          .then(functions => {
            pageIdList = functions.map(fct => fct.pageId);
            let filter = { _id: { $in: pageIdList } };
            return this.getPagesByFilter(filter, {})
          })
          .then((pages) => {
            pages = databaseTools.convertObjects(pages);
            resolve(pages);
          })
          .catch((err) => {
            reject(err);
          })
      }

      // TODO use getPagesByFilter

      let filter = {};
      if (query) {
        filter = databaseTools.getFilter(['properties.val'], query.q);
      }

      filter.projectId = projectId;

      if (query.meta === 'count') {
        pages.count(filter, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      } else {
        pages.find(filter).toArray((err, data) => {
          if (err) {
            reject(err);
          }
          data = databaseTools.convertObjects(data);
          resolve(data);
        });
      }
    })
  }

  getPage(projectId, pageId) {
    return new Promise((resolve, reject) => {
      var pages = this.getCollection();
      if (!pages) {
        reject(new Error("pages not found"));
      }
      let filter = { projectId: projectId, _id: pageId };
      pages.findOne(filter, (err, data) => {
        if (err) {
          reject(err);
        }
        data = databaseTools.convertObjects(data);
        resolve(data);
      });
    })
  }
}

module.exports = DatabasePage;
