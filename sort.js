/**
 * Sort html tables
 *
 * Styling is done in css.
 *
 * Copyleft 2022 DDHost
 *
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org>
 *
 */

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
