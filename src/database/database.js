
var MongoClient = require('mongodb').MongoClient;
var databaseTools = require('./database-tools');
let DatabasePage = require('./database-page');
let DatabaseProject = require('./database-project');
let DatabaseRedlining = require('./database-redlining');
let DatabaseFunction = require('./database-function');

// dev stage
const DATABASE_NAME = "dev_dbprojects-0a7b63de-9e54-4d7d-a3b0-d15a2aef8679";

// var COLLECTION_DATA = "data";

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
				this.mongoDatabase = connection.db(DATABASE_NAME);

				this.dbPage = new DatabasePage(this);
				this.dbProject = new DatabaseProject(this);
				this.dbRedlining = new DatabaseRedlining(this);
				this.dbFunction = new DatabaseFunction(this);

				resolve(this.mongoDatabase);
			})
		})
	}

	getMongoDatabase() {
		return this.mongoDatabase;
	}

	getProjects(query) {
		return this.dbProject.getProjects(query);
	}

	postProject(project) {
		return this.dbProject.postProject(project);
	}

	getProject(projectId) {
		return this.dbProject.getProject(projectId);
	}

	getPages(projectId, query) {
		return this.dbPage.getPages(projectId, query);
	}

	getPage(projectId, pageId) {
		return this.dbPage.getPage(projectId, pageId);
	}

	getRedlinings(projectId, query) {
		return this.dbRedlining.getRedlinings(projectId, query);
	}

	getFunctions(projectId, query) {
		return this.dbFunction.getFunctions(projectId, query);
	}
}

module.exports = new Database();
