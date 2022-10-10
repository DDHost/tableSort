
'use strict';

function sort(tBody, column, asc) {
    // The compare function
    let compareFn = (colIndex, asc) => {
        return (a, b) => {
            // Get the value of each cell in selected column
            const aText = a.children[colIndex].textContent.trim();
            const bText = b.children[colIndex].textContent.trim();

            if (b !== '' && a !== '' && !isNaN(a) && !isNaN(b)) return asc ? a - b : b - a;
            else return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
        };
    };

    // the index of the column to select
    // the only cell that are in the column.
    // like: index = 0 only row[0].innerText
    const columnIndex = Array.from(column.parentNode.children).indexOf(column);

    // Make an array of all rows in the body
    // then sort them by current asc
    // and then append rows
    Array.from(tBody.querySelectorAll('tr'))
        .sort(compareFn(columnIndex, (asc = !asc)))
        .forEach((row) => tBody.appendChild(row));
}

/* ///////// THE CODE BELOW IS JUST FOR TESTING ///////// */

function fillTable(tBody, rowLen) {
    var fragment = document.createDocumentFragment();

    const ROWS = Array.prototype.slice.call(tBody.children);

    for (let i = 0; i < rowLen; i++) {
        ROWS.forEach((row) => fragment.appendChild(row.cloneNode(true)));
    }

    tBody.innerHTML = '';
    tBody.appendChild(fragment);
}

window.onload = () => {
    const tHead = document.querySelector('thead');
    const tBody = document.querySelector('tbody');

    let asc = false;

    fillTable(tBody, 100);

    tHead.addEventListener('click', ({ target }) => {
        if (target.tagName == 'TH') {
            asc ? target.setAttribute('data-table-sort', 'asc') : target.setAttribute('data-table-sort', 'desc');
            sort(tBody, target, (asc = !asc));
        }
    });
};
