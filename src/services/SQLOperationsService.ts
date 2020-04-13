import * as SQLite from 'expo-sqlite';

var db_version = '1'

/***
 * Utility low level functions
 */
async function setupDatabase() {
  // await destroyDatabase()
  await turnOnForeignKeys()
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('collections', db_version);
    db.transaction(tx => {
      tx.executeSql("create table if not exists series (series_id integer primary key not null, name text)", [])
      tx.executeSql("create table if not exists books (isbn_13 text primary key not null, title text, isbn_10 text, img text, series_id REFERENCES series(series_id))", [], resolve)
    },
      (err: any) => { console.log(err) },
    )
  })
}

function turnOnForeignKeys() {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('collections', db_version);
    db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => {
      console.log('Foreign keys turned on')
      resolve()
    }
    );
  })
}

function destroyDatabase() {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('collections', db_version);
    db.transaction(tx => {
      tx.executeSql("drop table if exists books", [])
      tx.executeSql("drop table if exists series", [], resolve)
    },
      (err: any) => { console.log(err) },
    )
  })
}

function select(tables: string, values: string): Promise<SQLResultSetRowList> {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('collections', db_version);
    const query: string = `select ${values} from ${tables}`
    console.log(query)
    db.transaction(tx => {
      tx.executeSql(query, [], (_, { rows }) => {
        // console.log(JSON.stringify(rows))
        resolve(rows);
      });
    },
      (err: any) => { reject(err) },
    )
  })
}

function selectWhere(tables: string, values: string, where: string, join: string): Promise<SQLResultSetRowList> {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('collections', db_version);
    const query: string = `select ${values} from ${tables} ${join} where ${where}`
    console.log(query)
    db.transaction(tx => {
      tx.executeSql(query, [], (_, { rows }) => {
        // console.log(JSON.stringify(rows))
        resolve(rows);
      });
    },
      (err: any) => { reject(err) },
    )
  })
}

function insert(table: string, values: string, fields: string) {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('collections', '2');
    db.transaction(tx => {
      tx.executeSql(`insert into ${table} (${fields}) values (${values})`, [], resolve)
    },
      (err: any) => { reject(err) },
    )
  })
}


export {
  insert,
  selectWhere,
  select,
  setupDatabase
}