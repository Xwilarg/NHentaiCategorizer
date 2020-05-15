var favContainer = document.getElementById("favcontainer");
let categoryHtml = '<br/><br/><button id="manageCategories" class="btn btn-primary">Manage Categories ▼</button>' +
    '<div id="categoryContainer" hidden>TODO</div>';
favContainer.insertAdjacentHTML('beforebegin', categoryHtml);
document.getElementById('manageCategories').addEventListener('click', function() {
    var container = document.getElementById('categoryContainer');
    document.getElementById('manageCategories').innerHTML = "Manage Categories" + (container.hidden ? "▲" : "▼");
    container.className = (container.hidden ? "container" : "");
    container.hidden = !container.hidden;
});