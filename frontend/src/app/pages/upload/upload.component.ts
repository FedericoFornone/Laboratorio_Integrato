import { Component, ViewChild } from '@angular/core';
import { CSVRecord } from 'src/app/CSVRecord';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  download = {
    filename: 'CSV Template',
    url: 'assets/download/CSV_TEMPLATE.csv',
  };

  /* DOWNLOAD TEMPLATE */
  downloadFile(url: any, fileName: any) {
    fetch(url, {
      method: 'get',
      mode: 'no-cors',
      referrerPolicy: 'no-referrer',
    })
      .then((res) => res.blob())
      .then((res) => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
      });
  }

  /* UPLOAD FILE */
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headersRow.length
        );
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (<string>csvRecordsArray[i]).split(',');
      if (currentRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        /* csvRecord.id = curruntRecord[0].trim();  
        csvRecord.firstName = curruntRecord[1].trim();  
        csvRecord.lastName = curruntRecord[2].trim();  
        csvRecord.age = curruntRecord[3].trim();  
        csvRecord.position = curruntRecord[4].trim();  
        csvRecord.mobile = curruntRecord[5].trim();   */
        csvRecord['ITTER107 '] = currentRecord[0].trim();
        csvRecord.Territorio = currentRecord[1].trim();
        csvRecord.TIPO_DATO7 = currentRecord[2].trim();
        csvRecord.Indicatori = currentRecord[3].trim();
        csvRecord.CORREZ = currentRecord[4].trim();
        csvRecord.Correzione = currentRecord[5].trim();
        csvRecord.TIPO_ALLOGGIO2 = currentRecord[6].trim();
        csvRecord['Tipologia di esercizi'] = currentRecord[7].trim();
        csvRecord.ATECO_2007 = currentRecord[8].trim();
        csvRecord['Ateco 2007'] = currentRecord[9].trim();
        csvRecord.ISO = currentRecord[10].trim();
        csvRecord['Paese di residenza dei clienti'] = currentRecord[11].trim();
        csvRecord.TIME = currentRecord[12].trim();
        csvRecord['Seleziona periodo'] = currentRecord[13].trim();
        csvRecord.Value = currentRecord[14].trim();
        csvRecord['Flag codes'] = currentRecord[15].trim();
        csvRecord.Flags = currentRecord[16].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }

  ngOnInit(): void {}
}
