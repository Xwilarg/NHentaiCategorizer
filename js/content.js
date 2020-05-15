function updateCategories() {
    chrome.storage.sync.get({
        categories: []
    }, function(elems) {
        elems.categories.sort();
        let categoryHtml = "";
        elems.categories.forEach(function(c) {
            categoryHtml += c + ' <button id="category_' + c + '" class="btn btn-primary">Remove</button><br/>';
        });
        document.getElementById("allCategories").innerHTML = categoryHtml;
        let i = 0;
        elems.categories.forEach(function(c) {
            let counter = i;
            document.getElementById('category_' + c).addEventListener('click', function() {
                elems.categories.splice(counter, 1);
                chrome.storage.sync.set({
                    categories: elems.categories
                });
                updateCategories();
            });
            i++;
        });
    });
}

let favContainer = document.getElementById("favcontainer");
let categoryHtml = '<br/><br/><button id="manageCategories" class="btn btn-primary">Manage Categories ▼</button>' +
    '<div id="categoryContainer" hidden>' +
	'<input id="categoryAddInput" type="text">' +
    '<button id="categoryAddButton" class="btn btn-primary">Add</button>' +
    '<div id="allCategories"></div>'
    '</div>';
favContainer.insertAdjacentHTML('beforebegin', categoryHtml);
updateCategories();

document.getElementById('manageCategories').addEventListener('click', function() {
    let container = document.getElementById('categoryContainer');
    document.getElementById('manageCategories').innerHTML = "Manage Categories " + (container.hidden ? "▲" : "▼");
    container.className = (container.hidden ? "container" : ""); // For some reason hidden doesn't work on containers
    container.hidden = !container.hidden;
});

document.getElementById('categoryAddButton').addEventListener('click', function() {
    let inputField = document.getElementById('categoryAddInput');
    chrome.storage.sync.get({
        categories: []
    }, function(elems) {
        let value = inputField.value.replace("'", "");
        if (value != "" && !elems.categories.includes(value)) {
            elems.categories.push(value);
            chrome.storage.sync.set({
                categories: elems.categories
            });
            inputField.value = "";
            updateCategories();
        }
    });
});