
let ObjectID = require('mongodb').ObjectID;

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
        reject(new Error("graphics not found"));
      }
      if (!projectId) {
        reject(new Error("projectId missing"));
      }
      if (!graphicId) {
        reject(new Error("graphicId missing"));
      }
      let filter = {
        projectId: projectId,
        _id: ObjectID(graphicId)
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
        reject(new Error("graphics not found"));
      }
      if (!projectId) {
        reject(new Error("projectId missing"));
      }
      let filter = {
        projectId: projectId
      }
      if (graphicId) {
        filter._id = ObjectID(graphicId);
      }
      collection.remove(filter, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    });
  }

  /*
    filter:
      - pageId
      - graphicId
  */
  load(projectId, filter) {
    return new Promise((resolve, reject) => {
      var graphics = this.getCollection();
      if (!graphics) {
        reject(new Error("graphics not found"));
      }

      let dbFilter = {
        projectId: projectId
      };
      for (let filterField in filter) {
        switch (filterField) {
          case "pageId":
            if (!filter.pageId) {
              reject(new Error("filter pageId empty"));
            }
            dbFilter.pageId = filter.pageId;
            break;
          case "graphicId":
            if (!filter.graphicId) {
              reject(new Error("filter graphicId empty"));
            }
            dbFilter._id = ObjectID(filter.graphicId);
            break;
          default:
            reject(new Error("invalid filter field: " + filterField));
        }
      }
      graphics.find(dbFilter).toArray((err, data) => {
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
        reject(new Error("graphics not found"));
      }
      if (Array.isArray(graphic)) {
        for (let g of graphic) {
          g.projectId = projectId;
          if (pageId) {
            g.pageId = pageId;
          }
        }
      } else {
        graphic.projectId = projectId;
        if (pageId) {
          graphic.pageId = pageId;
        }
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
