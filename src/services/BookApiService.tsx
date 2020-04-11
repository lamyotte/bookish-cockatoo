
var API_KEY = 'API_KEY'

async function getBookInfo(isbn: string) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${isbn}&key=${API_KEY}&maxResults=1`);
        const json = await response.json();
        return json.items;
    } catch (error) {
        console.error(error);
    }
}


export { getBookInfo }