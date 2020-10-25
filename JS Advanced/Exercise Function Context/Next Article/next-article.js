function getArticleGenerator(array) {
    let mainDiv = document.getElementById('content');
    function showNext() {
        if (array.length > 0) {
            mainDiv.insertAdjacentHTML("beforeend", `<article>${array.shift()}</article>`);
        }
    }
    return showNext;
}