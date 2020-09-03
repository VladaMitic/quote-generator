const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loader
function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loader
function hiddeLoader() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get quote from API
async function getQuote() {
    showLoader();
    const proxyUrl = "https://salty-ridge-10349.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //if author is black add unknown, else add author name from data
        if(data.quoteAuthor === '') {
            quoteAuthor.innerText = 'Unknown';
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }

        //reduce font size for long quote
        if(data.quoteText.length > 120 ) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        //stop loader and show quote
        hiddeLoader();
        
    } catch (error) {
        getQuote();
    }
}

//Geting data from DOM and send tweet- twitter function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event listener for trigering twitter function
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//on page load
getQuote();