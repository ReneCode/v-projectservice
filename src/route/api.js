
var express = require('express');
var router = express.Router();

var database = require('../database/database');


const DATABASE_NAME = "dev_dbprojects-0a7b63de-9e54-4d7d-a3b0-d15a2aef8679";

database.connect()
	.then(() => {
		database.openDatabase(DATABASE_NAME)
	});

function getProjects(req, res) {
	database.getProjects()
		.then((projects) => {
			res.json(projects);
		})
		.catch(() => {
			res.sendStatus(500);

		})
}


function getPages(projectId, res) {
	database.getPages(projectId)
		.then((pages) => {
			res.json(pages);
		})
		.catch(() => {
			res.sendStatus(500);
		})
}

function getSvg(projectId, fileName, res) {
	res.send("SVG");
}

router.get("/projects", getProjects);
router.get("/:projectId/pages", (req, res) => getPages(req.params.projectId, res));
router.get("/:projectId/svg/:fileName", (req, res) => getSvg(req.params.projectId, req.params.fileName,res));

module.exports = router;



