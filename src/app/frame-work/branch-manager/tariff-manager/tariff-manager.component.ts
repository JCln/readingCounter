import { BranchesService } from 'services/branches.service';
import { Component, OnInit } from '@angular/core';
import { ENManageServers, IManageServer } from 'interfaces/iserver-manager';
import { EN_tariff, ITariffManager } from 'interfaces/enums.enum';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { AddExcelFileComponent } from '../../manage/read/formula/add-excel-file/add-excel-file.component';
import { FormulasService } from 'services/formulas.service';
import { MatDialog } from '@angular/material/dialog';
import { EN_Routes } from 'interfaces/routes.enum';

@Component({
  selector: 'app-tariff-manager',
  templateUrl: './tariff-manager.component.html',
  styleUrls: ['./tariff-manager.component.scss']
})
export class TariffManagerComponent implements OnInit {
  manageTasks: ITariffManager[];

  constructor(
    public branchesService: BranchesService,
    public formulasService: FormulasService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.manageTasks = this.branchesService.getManageServerItems();
  }
  openAddExcelDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(AddExcelFileComponent,
        {
          minWidth: '21rem',
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.formulasService.postExcelFile(ENInterfaces.tariffAddExcel);
        }
      });
    });
  }
  manageFuncs = async (clickFunction: EN_tariff, description: string) => {
    if (clickFunction == EN_tariff.getSampleExcel) {
      const res = await this.branchesService.ajaxReqWrapperService.getBlobAsJsonObserve(ENInterfaces.tariffExcelSample);
      this.branchesService.outputManagerService.downloadFileWithContentDisposition(res);
    }
    if (clickFunction == EN_tariff.postExcelToFill) {
      this.branchesService.utilsService.routeTo(EN_Routes.tariffExcelToFill);
    }
    if (clickFunction == EN_tariff.AddExcel) {
      this.openAddExcelDialog();
    }
    if (clickFunction == EN_tariff.viewGrid) {
      console.log('view grid');
    }
    if (clickFunction == EN_tariff.calculation) {
      console.log('calculation');
    }
  }

}