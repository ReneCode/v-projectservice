
var databaseTools = require('./database-tools');

var COLLECTION_GRAPHIC = "graphics";

class DatabaseGraphic {

  constructor(database) {
    this.database = database;
  }

  getCollection() {
    return this.database.getMongoDatabase().collection(COLLECTION_GRAPHIC);
  }

  update(projectId, graphicId, replacement) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      if (!collection) {
        reject("graphics not found");
      }
      if (!projectId) {
        reject("projectId missing");
      }
      if (!graphicId) {
        reject("graphicId missing");
      }
      let filter = {
        projectId: projectId,
        _id: graphicId
      }
      collection.findOneAndUpdate(filter, replacement, { returnOriginal: false }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  remove(projectId, graphicId) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      if (!collection) {
        reject("graphics not found");
      }
      if (!projectId) {
        reject("projectId missing");
      }
      let filter = {
        projectId: projectId
      }
      if (graphicId) {
        filter._id = graphicId;
      }
      collection.remove(filter, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    });
  }

  load(projectId, pageId) {
    return new Promise((resolve, reject) => {
      var graphics = this.getCollection();
      if (!graphics) {
        reject("graphics not found");
      }

      let filter = {
        projectId: projectId
      };
      if (pageId) {
        filter.pageId = pageId;
      }

      graphics.find(filter).toArray((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    })
  }

  save(projectId, pageId, graphic) {
    return new Promise((resolve, reject) => {
      var graphics = this.getCollection();
      if (!graphics) {
        reject("graphics not found");
      }
      if (Array.isArray(graphic)) {
        for (let g of graphic) {
          g.pageId = pageId;
          g.projectId = projectId;
        }
      } else {
        graphic.pageId = pageId;
        graphic.projectId = projectId;
      }
      graphics.insert(graphic, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}

module.exports = DatabaseGraphic;
