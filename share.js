const shareSupport = ('share' in navigator);
const btnShare = document.querySelector('#btnShare');
const titleInput = document.querySelector('#title');
const textInput = document.querySelector('#text');
const urlInput = document.querySelector('#url');
const snackbar = document.querySelector("#snackbar");
const divMess = document.querySelector("#snackbarMessage");
let supportMess;

if (!shareSupport) {
    supportMess += "<p>The Contact API is not available in your browser.</p>";
}
if (supportMess) {
    showMessage(supportMess);
}
let contentToShare = {
    title: 'Web Share Target API',
    text: 'Check out Web Share Target API Demo',
    url: 'https://web-share-target.firebaseapp.com/',
}

/* shows dissmisble snakcbar in the page*/
function showMessage(content) {
    if (snackbar.className.indexOf('show') > -1) {
        divMess.innerHTML = divMess.innerHTML + content;
    } else {
        snackbar.className = "show";
        divMess.innerHTML = content;
    }
}

function closeMessage() {
    snackbar.className = snackbar.className.replace("show", "");
    divMess.innerHTML = "";
}

function populateFields() {
    titleInput.value = contentToShare.title;
    textInput.value = contentToShare.text;
    urlInput.value = contentToShare.url;
}

function onLoad() {
    btnShare.disabled = !shareSupport;
    const parsedUrl = new URL(window.location.toString());
    // showMessage("<p>" + window.location.toString() + "</p>");
    let title = parsedUrl.searchParams.get("title");
    let text;
    if (parsedUrl.searchParams.get("text")) {
        text = parsedUrl.searchParams.get("text");
    }
    if (parsedUrl.searchParams.get("body")) {
        text = parsedUrl.searchParams.get("body");
    }
    let url = parsedUrl.searchParams.get("url");
    if(title) {
        if(!url  && text.indexOf("http") >-1 ) 
            url= text.substring(text.indexOf("http"), text.length-1)
        contentToShare = { title, text, url }
    }
    populateFields();
}

btnShare.addEventListener('click', () => {
    navigator.share(contentToShare)
        .then(() => showMessage("<p>Successful share</p>"))
        .catch((error) => {
            showMessage("<p>Error sharing</p>");
            console.log('Error sharing', error)
        });
})

window.addEventListener('DOMContentLoaded', onLoad);