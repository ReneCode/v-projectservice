
var databaseTools = require('./database-tools');

var COLLECTION_PROJECT = "projects";

class DatabaseProject {

  constructor(database) {
    this.database = database;
  }

  getCollection() {
    return this.database.collection(COLLECTION_PROJECT);
  }

  getFilter(query) {
    if (!query || !query.q) {
      return {};
    }
    function oneFilter(name, val) {
      let f = {}
      f[name] = new RegExp(val, 'i');
      return f;
    }

    const q = query.q;
    let filterList = [];
    filterList.push(oneFilter("Name", q))
    filterList.push(oneFilter("Description", q))
    filterList.push(oneFilter("Version", q))
    let filter = { $or: filterList };
    return filter;
  }

  getProjects(query) {
    return new Promise((resolve, reject) => {
      var projects = this.getCollection();
      if (!projects) {
        reject("projects not found");
      }
      const filter = this.getFilter(query);
      projects.find(filter).toArray((err, data) => {
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
