// DOMs
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quoteText");
const authorText = document.getElementById("authorText");
const twitter = document.getElementById("twitter");
const nextQuote = document.getElementById("next-quote");
const loader = document.getElementById("loader");

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const hideLoadingSpinner = () => {
    if(!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}


// quote api generator

async function getQuote()
    {
        try {
            showLoadingSpinner();
            const apiUrl = "https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if(data.quoteText.length > 50)
                {
                    quoteText.innerText = data.quoteText;
                    quoteText.style.fontSize = "90%";
                }
            else
                {
                    quoteText.innerText = data.quoteText;
                }

            if(data.quoteAuthor === "")
                {
                    authorText.innerText = "Unknown";
                }
            else
                {
                    authorText.innerText = data.quoteAuthor;
                }
            hideLoadingSpinner();
        }catch(erro){
            console.log(error);
        }
        
    };

getQuote();

const tweetQuote = () => {
    const quote = quoteText.innerText;
    const author = authorText.innerText;

    const tweetUrl = `https://twitter.com/intent/tweet/?text=${quote}-${author}`;

    // creates a new window in the browser
    window.open(tweetUrl , "_blank");

}

// Event Listeners
nextQuote.addEventListener("click" , getQuote);

twitter.addEventListener("click" , tweetQuote);