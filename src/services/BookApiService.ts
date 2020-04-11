var API_KEY = ''

async function getBookInfo(isbn: string) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${isbn}&key=${API_KEY}&maxResults=1`);
        const json = await response.json();
        if ('error' in json) {
            console.log("ERROR GETTING BOOK INFO")
            return false
        }
        return formatBook(json.items[0]);
    } catch (error) {
        console.error(error);
    }
}

function formatBook(book: any) {
    let formattedBook = {
        'title': book['volumeInfo']['title'],
        'author': book['volumeInfo']['author'],
        'isbn_13': book['volumeInfo']['industryIdentifiers'][1]['identifier'],
        'isbn_10': book['volumeInfo']['industryIdentifiers'][0]['identifier'],
        'img': book['volumeInfo']['imageLinks']['thumbnail']
    }
    return formattedBook
}

export { getBookInfo }