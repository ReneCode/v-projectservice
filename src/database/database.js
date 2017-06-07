
var MongoClient = require('mongodb').MongoClient;
var databaseTools = require('./database-tools');

const DATABASE_NAME = "dev_dbprojects-0a7b63de-9e54-4d7d-a3b0-d15a2aef8679";

var COLLECTION_PROJECT = "projects";
var COLLECTION_PAGE = "pages";

class Database {
	constructor() {
		this.database = undefined;
	}

	connect(connectionString) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(connectionString, (err, connection) => {
				if (err) {
					reject(err);
				}
				this.database = connection.db(DATABASE_NAME);
				resolve(this.database);
			})
		})
	}

	getProjects() {
		return new Promise((resolve, reject) => {
			var projects = this.database.collection(COLLECTION_PROJECT);
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

	getProject(projectId) {
		return new Promise((resolve, reject) => {
			var projects = this.database.collection(COLLECTION_PROJECT);
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


	getPages(projectId, query) {
		return new Promise((resolve, reject) => {
			var pages = this.database.collection(COLLECTION_PAGE);
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
}

module.exports = new Database();