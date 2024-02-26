module.exports = {
  protect: function (fn, arg) {
    if (fn) {
      try {
        return fn(arg);
      }
      catch (err) {
        console.log(err);
        return null;
      }
    }
    else {
      return null;
    }
  },
  formatDate: function (date) {
    if (date) {
      return new Date(date).toISOString().substring(0, 10);
    }
    else {
      return null;
    }
  },
  formatDatetime: function (datetime) {
    if (datetime) {
      return new Date(datetime).toISOString();
    }
    else {
      return null;
    }
  },
  formatEnumValue: function (enumValue) {
    if (enumValue) {
      return enumValue[0].toUpperCase() + enumValue.substring(1);
    }
    else {
      return null;
    }
  },
  isForeignKeyError: function (err) {
    return err.code === 'SQLITE_CONSTRAINT' || // Sqlite
      err.code === 'ER_ROW_IS_REFERENCED_2' || // Mysql
      err.code === '23503' || // Postgres
      err.code === 'ORA-02292'; // Oracle
  }
}