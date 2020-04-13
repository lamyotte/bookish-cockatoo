
export interface Book {
    title: string;
    book_id: string;
    series_name: string;
    series_id: string;
}

export interface BookDetails extends Book {
    isbn_13: string;
    isbn_10: string;
    img: string;
}

export interface Serie {
    series_name: string;
    series_id: string;
}

export async function listBooks(): Promise<Book[]> {
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

export async function listSeries(): Promise<Serie[]> {
    return [
        {
            'series_name': 'Haikyuu',
            'series_id': '1',
        },
        {
            'series_name': 'Ten Count',
            'series_id': '2',
        }
    ]
}

export async function getBookDetails(book_id: string): Promise<BookDetails> {
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

export async function getBooksInSeries(series_id: string) {
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