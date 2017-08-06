
const escapeStringRegexp = require('escape-string-regexp')

class DatabaseTools {
  convertObjects(obj) {
    obj = this.convertProperty_id2id(obj);
    obj = this.convertProperties(obj);
    return obj;
  }

  getFilter(fields, q) {
    if (!q) {
      return {};
    }
    function oneFilter(name, val) {
      let f = {};
      val = escapeStringRegexp(val);
      f[name] = new RegExp(val, 'i');
      return f;
    }

    let filterList = [];
    fields.forEach(field => {
      filterList.push(oneFilter(field, q))
    })
    let filter = { $or: filterList };
    return filter;
  }

  // ------------------------------

  removePropertyId(obj) {
    if (!obj) {
      return obj;
    }
    if (Array.isArray(obj)) {
      obj.forEach(o => {
        o = this.removePropertyId(o);
      });
    }
    if (obj.id) {
      delete obj.id;
    }
    return obj;
  }

  convertProperty_id2id(obj) {
    if (!obj) {
      return obj;
    }
    if (Array.isArray(obj)) {
      obj.forEach(o => {
        o = this.convertProperty_id2id(o);
      });
    }

    if (obj._id) {
      const val = obj._id;

      if (obj.id) {
        console.error("Property Id will be overwritten:", obj);
      }

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

    if (obj.properties && Array.isArray(obj.properties)) {
      let props = {};
      obj.properties.forEach(p => {
        props[p.id] = p.val;
      });
      obj.properties = props;
    }
    return obj;
  }




}

module.exports = new DatabaseTools();

