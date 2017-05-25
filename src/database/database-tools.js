
var assert = require('assert');

class DatabaseTools {

	keysToLowerCase(obj) {
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

}

module.exports = new DatabaseTools();

