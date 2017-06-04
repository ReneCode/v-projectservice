
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
}

module.exports = new DatabaseTools();

