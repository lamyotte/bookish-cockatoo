import * as SQLite from 'expo-sqlite';

var db_version = '1'


/***
 * Utility low level functions
 */
async function setupDatabase() {
    await destroyDatabase()
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

function select(tables: string, values: string) {
    return new Promise((resolve, reject) => {
        const db = SQLite.openDatabase('collections', db_version);
        db.transaction(tx => {
            tx.executeSql(`select ${values} from ${tables}`, [], (_, { rows }) => {
                // console.log(JSON.stringify(rows))
                resolve(rows);
            });
        },
            (err: any) => { reject(err) },
        )
    })
}

function selectWhere(tables: string, values: string, where: string, join: string) {
    return new Promise((resolve, reject) => {
        const db = SQLite.openDatabase('collections', db_version);
        db.transaction(tx => {
            tx.executeSql(`select ${values} from ${tables} ${join} where ${where}`, [], (_, { rows }) => {
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

/**
 * High level functions
 */

async function listBooks() {
    console.log("LIST ALL BOOKS")
    let books = await select('books, series', 'books.title as title, books.isbn_13 as book_id, series.name as series_name, books.series_id')
    return books['_array']
}

async function saveBook(book: any) {
    console.log("SAVING BOOK")
    let series_name = book['title'].replace(/[,\s{0,}Vol\.\s{0,}\d{1,3}]/g, '');
    let series_id = await selectWhere('series', 'series_id', `name LIKE '%${series_name}%'`, '')
    if (series_id['length'] == 0) {
        await insert('series', `"${series_name}"`, 'name')
        series_id = await selectWhere('series', 'series_id', `name LIKE '%${series_name}%'`, '')
    }
    series_id = series_id['_array'][0]['series_id']
    let formatted_book = `"${book['title']}", "${book['isbn_13']}", "${book['isbn_10']}", "${book['img']}",  ${series_id}`
    await insert('books', formatted_book, 'title , isbn_13 , isbn_10 , img , series_id')
}

function getBookDetails(book_id: number) {
    return {
        'book_id': '1',
        'title': 'Haikyuu, Vol. 1',
        'isbn_13': 'whatever',
        'isbn_10': '1111111111',
        'img': 'text',
        'series_id': '1',
        'series_name': 'Haikyuu'
    }
}

async function getBooksInSeries(series_id: number) {
    console.log("GET BOOK IN SERIES")
    let books = await selectWhere('series, books',
        'series.name as series_name, books.title as title, books.isbn_13 as book_id, series.name as series_name, books.series_id',
        `series.series_id = ${series_id}`, '')
    return books['_array']
}

export {
    setupDatabase,
    listBooks,
    getBookDetails,
    getBooksInSeries,
    saveBook
}