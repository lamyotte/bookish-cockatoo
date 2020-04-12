import { selectWhere, select, insert } from './SQLOperationsService'

/**
 * High level functions
 */

async function listBooks() {
    console.log("LIST ALL BOOKS")
    let books: any = await select('books, series', 'books.title as title, books.isbn_13 as book_id, series.name as series_name, books.series_id')
    return books['_array']
}

async function saveBook(book: any) {
    console.log("SAVING BOOK")
    let series_name = book['title'].replace(/[,\s{0,}Vol\.\s{0,}\d{1,3}]/g, '');
    let series_id: any = await selectWhere('series', 'series_id', `name LIKE '%${series_name}%'`, '')
    if (series_id['length'] == 0) {
        await insert('series', `"${series_name}"`, 'name')
        series_id = await selectWhere('series', 'series_id', `name LIKE '%${series_name}%'`, '')
    }
    series_id = series_id['_array'][0]['series_id']
    let formatted_book: string = `"${book['title']}", "${book['isbn_13']}", "${book['isbn_10']}", "${book['img']}",  ${series_id}`
    await insert('books', formatted_book, 'title , isbn_13 , isbn_10 , img , series_id')
}

async function getBookDetails(book_id: number) {
    let book: any = await selectWhere('books', '*', `isbn_13 = ${book_id}`, '')
    return book
}

async function getBooksInSeries(series_id: number) {
    console.log("GET BOOK IN SERIES")
    let books: any = await selectWhere('series, books',
        'series.name as series_name, books.title as title, books.isbn_13 as book_id, series.name as series_name, books.series_id',
        `series.series_id = ${series_id}`, '')
    return books['_array']
}

export {
    listBooks,
    getBookDetails,
    getBooksInSeries,
    saveBook
}