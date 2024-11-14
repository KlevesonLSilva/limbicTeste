import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule
  ],
  templateUrl: './import-table.component.html',
  styleUrls: ['./import-table.component.css']
})
export class ImportTableComponent {
  public  progressBarValue: number = 33;
  public fileName: string = '';
  public tableData: any[] = [];
  public displayedColumns: string[] = [];

  constructor(
    private location: Location,
    private snackBar: MatSnackBar
  ) {

  }

   public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.snackBar.open('Por favor, selecione um arquivo no formato .xlsx', 'Fechar', {
          duration: 3000,
        });
        return;
      }
      this.readFile(file);
      this.progressBarValue = 66;
      this.fileName = file.name;
    }

  }

  public getProgressMessage(): string {
    if (this.progressBarValue <= 50) {
      return 'Subir Datos';
    } else if (this.progressBarValue > 50 && this.progressBarValue <= 66) {
      return 'Extracción';
    } else {
      return 'Proceso Completado';
    }
  }

  public clear(): void {
    this.tableData = [];
    this.displayedColumns = [];
    this.fileName = '';
    this.progressBarValue = 33;
  }

  public back(): void {
   this.clear();
    this.location.back();
  }

  public finalize(): void {
    if (this.tableData.length) {
      this.snackBar.open('Processo finalizado com sucesso!', 'Fechar', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Erro ao finalizar o processo', 'Fechar', {
        duration: 3000,
      });
    }
  }

  private readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => this.processFile(reader.result as ArrayBuffer);
    reader.readAsArrayBuffer(file);
  }

  private processFile(data: ArrayBuffer): void {
    const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });

    this.displayedColumns = this.getDisplayedColumns(jsonData);
    this.tableData = this.getTableData(jsonData);
  }

  private getDisplayedColumns(jsonData: any[]): string[] {
    return (jsonData[0] as string[]).filter(column => column !== undefined);
  }

  private getTableData(jsonData: any[][]): any[] {
    return jsonData.slice(1).map((row: any[]) => {
      const rowData: any = {};
      row.forEach((cell, index) => {
        if (this.displayedColumns[index] !== undefined) {
          rowData[this.displayedColumns[index]] = cell;
        }
      });
      return rowData;
    });
  }
}
