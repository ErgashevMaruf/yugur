
export default function onExportExcel(data: any) {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(data, {
            header: [],
            skipHeader: true,
        });
        //worksheet["!cols"] = wscols;
        //const worksheet = xlsx.utils.json_to_sheet(data, {header:[], skipHeader:true});
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        saveAsExcelFile(excelBuffer, 'data');
    });
}
function saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
        const EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
    });
}
