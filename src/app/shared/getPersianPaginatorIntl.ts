import { MatPaginatorIntl } from '@angular/material/paginator';


const persianRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `${length}تا 0 `; }
    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${length} ردیف   ${startIndex + 1} - ${endIndex}  از  `;
}


export function getPersianPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'تعداد ردیف در هر صفحه:';
    paginatorIntl.nextPageLabel = 'صفحه بعد';
    paginatorIntl.previousPageLabel = 'صفحه قبل';
    paginatorIntl.getRangeLabel = persianRangeLabel;

    return paginatorIntl;
}