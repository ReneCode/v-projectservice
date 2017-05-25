
var MongoClient = require('mongodb').MongoClient;
var databaseTools = require('./database-tools');

var URL = process.env.DV_MONGO_URI;
var COLLECTION_PROJECT = "projects";
var COLLECTION_PAGE = "pages";

class Database {
	constructor() {
		this.database = undefined;
	}

	connect() {
		return new Promise((resolve, reject) => {
			MongoClient.connect(URL, (err, db) => {
				if (err) {
					reject(err);
				}
				this.database = db;
				resolve(db);
			})
		})
	}

	openDatabase(databaseName) {
		this.database = this.database.db(databaseName);
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

				resolve(data);
			});
		})
	}


	getPages(projectId) {
		return new Promise((resolve, reject) => {
			var pages = this.database.collection(COLLECTION_PAGE);
			if (!pages) {
				reject("pages not found");
			}
			pages.find({ ProjectId: projectId }).toArray((err, data) => {
				if (err) {
					reject(err);
				}
				data = databaseTools.keysToLowerCase(data);
				data = databaseTools.updateObjectIds(data);

				resolve(data);
			});
		})
	}
}

module.exports = new Database();