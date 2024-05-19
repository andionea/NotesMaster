function loadPage(page, pageTitle) {
    if (page === 'main') {
        // Redirecționează către pagina principală
        window.location.href = 'main.html';
    } else {
        // Încarcă celelalte pagini
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("content").innerHTML = this.responseText;
                document.title = pageTitle; 
            }
        };
        xhttp.open("GET", page + ".html", true);
        xhttp.send();
    }
}
