import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
    providedIn: 'root',
})
export class ExcelExportService {
    arr: any;
    constructor() {}
    exportToExcel(): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.arr);
        const workbook: XLSX.WorkBook = {
            Sheets: { data: worksheet },
            SheetNames: ['data'],
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveAsExcelFile(excelBuffer, 'data');
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: 'application/octet-stream',
        });
        const url: string = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName + '.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
    }

    changeDateFormat(date: Date | undefined) {
        if (date === undefined) return '';
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return day + '.' + month + '.' + year;
    }
}
