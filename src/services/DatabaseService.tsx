

function listBooks() {
    return [
        {
            'title': 'Haikyuu, Vol. 1',
            'book_id': '1',
            'series_name': 'Haikyuu',
            'series_id': '1',
        },
        {
            'title': 'Haikyuu, Vol. 2',
            'book_id': '2',
            'series_name': 'Haikyuu',
            'series_id': '1',
        },
        {
            'title': 'Ten Count, Vol. 1',
            'book_id': '3',
            'series_name': 'Ten Count',
            'series_id': '2',
        }
    ]
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

function getBooksInSeries(series_id: number) {
    return [
        {
            'title': 'Haikyuu, Vol. 1',
            'book_id': '1',
            'series_name': 'Haikyuu',
            'series_id': '1',
        },
        {
            'title': 'Haikyuu, Vol. 2',
            'book_id': '2',
            'series_name': 'Haikyuu',
            'series_id': '1',
        },
    ]
}