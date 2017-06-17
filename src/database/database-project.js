
var databaseTools = require('./database-tools');

var COLLECTION_PROJECT = "projects";

class DatabaseProject {

  constructor(database) {
    this.database = database;
  }

  getCollection() {
    return this.database.collection(COLLECTION_PROJECT);
  }

  getProjects() {
    return new Promise((resolve, reject) => {
      var projects = this.getCollection();
      if (!projects) {
        reject("projects not found");
      }
      projects.find({}).toArray((err, data) => {
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

  postProject(project) {
    return new Promise((resolve, reject) => {
      var projects = this.getCollection();
      if (!projects) {
        reject("projects not found");
      }

      if (!project) {
        reject("no project");
      }
      const isArray = Array.isArray(project);
      projects.insert(project, (err, data) => {
        if (err) {
          reject(err);
        }
        if (!data.ops) {
          reject("bad result");
        }
        if (isArray) {
          resolve(data.ops);
        } else {
          resolve(data.ops[0]);
        }
      });
    })
  }

  getProject(projectId) {
    return new Promise((resolve, reject) => {
      var projects = this.getCollection();
      if (!projects) {
        reject("projects not found");
      }
      projects.findOne({ _id: projectId }, (err, data) => {
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

module.exports = DatabaseProject;
