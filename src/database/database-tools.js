
var assert = require('assert');

class DatabaseTools {
	keysToLowerCase(obj) {
		if (!obj) {
			return obj;
		}
		if (Array.isArray(obj)) {
			obj.forEach(o => {
				o = this.keysToLowerCase(o);
			})
		}

		Object.keys(obj).forEach(function (key) {
			if (key != "_id") {
				var c = key[0].toLowerCase();
				var k = c + key.substr(1);

				if (k !== key) {
					obj[k] = obj[key];
					delete obj[key];
				}
			}
		});
		return obj;
	}

	updateObjectIds(obj) {
		if (!obj) {
			return obj;
		}
		if (Array.isArray(obj)) {
			obj.forEach(o => {
				o = this.updateObjectIds(o);
			});
		}

		if (obj._id) {
			const val = obj._id;
			assert(obj.id === undefined);
			obj.id = val;
			delete obj._id;
		}
		return obj;
	}

	convertProperties(obj) {
		if (!obj) {
			return null;
		}
		if (Array.isArray(obj)) {
			let objs = [];
			obj.forEach(o => {
				objs.push(this.convertProperties(o));
			})
			return objs;
		}

		if (obj.properties) {
			let props = {};
			obj.properties.forEach(p => {
				props[p._id] = p.Val;
			});
			obj.properties = props;
		}
		return obj;
	}




	// let tmp = {
	// 	"id": "512c8376-db1f-4d86-85f2-683d2bb1333c",
	// 	"type": "CadText",
	// 	"category": "default",
	// 	"htmlClass": "CadText",
	// 	"selectedItem": true,
	// 	"defaultRedliningText": "Redlining",
	// 	"x": 57.48313522338867,
	// 	"y": 255.6322021484375, "size": 6,
	// 	"angle": 0,
	// 	"color": "red",
	// 	"value": ""
	// }

	convertRedlinings(obj) {
		if (!obj) {
			return null;
		}

		if (Array.isArray(obj)) {
			let objs = [];
			obj.forEach(o => {
				objs.push(this.convertRedlinings(o));
			})
			return objs;
		}

		// convert the type
		switch (obj.type) {
			case "CadText":
				obj.type = "text";
		}

		// convert the graphic
		const graphic = JSON.parse(obj.graphic);
		if (graphic) {
			obj.x = graphic.x;
			obj.y = graphic.y;
			obj.text = graphic.value || graphic.defaultRedliningText || "-empty-";
			obj.fontSize = 6;
		}
		// delete obj.graphic;

		return obj;
	}
}

module.exports = new DatabaseTools();

