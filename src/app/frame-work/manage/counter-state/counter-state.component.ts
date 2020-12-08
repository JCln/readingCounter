import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IUserManager } from 'src/app/Interfaces/iuser-manager';

import { CheckboxRenderer } from '../../checkbox-renderer.componenet';
import { BtnCellRendererComponent } from '../../user-manager/all-contacts/btn-cell-renderer/btn-cell-renderer.component';
import { InteractionService } from './../../../services/interaction.service';
import { InterfaceManagerService } from './../../../services/interface-manager.service';

@Component({
  selector: 'app-counter-state',
  templateUrl: './counter-state.component.html',
  styleUrls: ['./counter-state.component.scss']
})
export class CounterStateComponent implements OnInit, AfterViewInit {
  frameworkComponents: any;
  rowDataClicked1 = {};
  zoneDictionary: IDictionaryManager[] = [];

  columnDefs = [
    {
      field: 'id',
      headerName: 'کد',
      editable: true,
      sortable: true,
      filter: true,
      cellClass: 'cell_conf'
    },
    {
      field: 'moshtarakinId',
      headerName: 'مشترکین',
      editable: true,
      sortable: true,
      filter: true,
      cellClass: 'cell_conf'
    },
    {
      field: 'title',
      headerName: 'عنوان',
      sortable: true,
      filter: true,
      cellClass: 'cell_conf  dir_ltr'
    },
    {
      field: 'zoneId',
      headerName: 'منطقه',
      editable: true,
      sortable: true,
      filter: true,
      cellClass: 'cell_conf'
    },
    {
      field: 'clientOrder',
      headerName: 'ترتیب',
      editable: true,
      sortable: true,
      filter: true,
      cellClass: 'cell_conf'
    },
    {
      field: 'canEnterNumber',
      headerName: 'ثبت رقم',
      editable: true,
      cellEditorParams: {
        values: ['true', 'false'],
      },
      sortable: true,
      filter: true,
      cellClass: 'cell_conf',
      cellRenderer: 'checkboxRenderer'
    },
    {
      field: 'isMane',
      headerName: 'مانع',
      editable: true,
      cellEditorParams: {
        values: ['true', 'false'],
      },
      sortable: true,
      filter: true,
      cellClass: 'cell_conf', cellRenderer: 'checkboxRenderer'
    },
    {
      field: 'canNumberBeLessThanPre',
      headerName: 'فعلی کمتر از قبلی',
      editable: true,
      sortable: true,
      filter: true,
      cellClass: 'cell_conf',
      cellRenderer: 'checkboxRenderer'
    },
    {
      field: 'isTavizi',
      headerName: 'تعویض',
      editable: true,
      sortable: true,
      filter: true,
      cellClass: 'cell_conf',
      cellRenderer: 'checkboxRenderer'
    },
    {
      field: 'shouldEnterNumber',
      headerName: 'اجبار رقم',
      editable: true,
      sortable: true,
      filter: true,
      cellClass: 'cell_conf',
      cellRenderer: 'checkboxRenderer'
    },
    {
      field: 'isXarab',
      headerName: 'خراب',
      editable: true,
      sortable: true,
      filter: true,
      cellClass: 'cell_conf', cellRenderer: 'checkboxRenderer'
    },
    {
      field: 'isFaqed',
      headerName: 'فاقد',
      sortable: true,
      filter: true,
      cellClass: 'cell_conf'
      , cellRenderer: 'checkboxRenderer'
    },
    {
      field: 'edit',
      headerName: 'ویرایش',
      cellRenderer: 'BtnCellRendererComponent',
      cellRendererParams: {
        onClick: this.onBtStartEditing.bind(this)
      },
      minWidth: 85,
      editable: false
    }

  ];
  dataSource: IUserManager;
  private gridApi;
  defaultColDef;
  editType;

  constructor(
    private httpClient: HttpClient,
    private interactionService: InteractionService,
    private interfaceManagerService: InterfaceManagerService,
    private router: Router
  ) {
  }

  scrambleAndRefreshAll() {
    this.gridApi.refreshCells('zoneId');
  }
  onBtnClick1(e) {
    this.rowDataClicked1 = e.rowData;
    console.log(e.rowData.id);
  }
  onBtStartEditing(index: any) {
    console.log(index.rowData.id);
    index = index.rowData.id;
    this.gridApi.setFocusedCell(index, 'edit');
    this.gridApi.startEditingCell({
      rowIndex: index,
      colKey: 'edit',
    });
  }
  onBtStartEditingLine2() {
    this.gridApi.setFocusedCell(2, 'id');
    this.gridApi.startEditingCell({
      rowIndex: 2,
      colKey: 'id',
    });
  }
  getDataSource = (): Promise<IUserManager> => {
    return new Promise((resolve) => {
      this.httpClient.get('http://37.191.92.130/kontoriNew/v1/counterState/all').subscribe((res: any) => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.zoneId)
          dataSource.zoneId = zoneDic.title;
      })
    });
    this.scrambleAndRefreshAll();
  }
  getZoneDictionary = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getZoneDictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.interactionService.saveDataForCounterState = null;
    }
    if (this.interactionService.saveDataForCounterState) {
      this.dataSource = this.interactionService.saveDataForCounterState;
      this.zoneDictionary = this.interactionService.saveDictionaryForCounterState;
    }
    else {
      this.dataSource = await this.getDataSource();
      this.zoneDictionary = await this.getZoneDictionary();
      this.interactionService.saveDataForCounterState = this.dataSource;
      this.interactionService.saveDictionaryForCounterState = this.zoneDictionary;
    }
    this.convertIdToTitle(this.dataSource, this.zoneDictionary);
  }
  ngOnInit(): void {
    this.classWrapper();
    this.frameworkComponents = {
      BtnCellRendererComponent: BtnCellRendererComponent,
      numericCellEditor: getNumericCellEditor(),
      checkboxRenderer: CheckboxRenderer
    }
    this.defaultColDef = {
      flex: 1,
      editable: true,
    };
    this.editType = 'fullRow';
  }
  ngAfterViewInit(): void {
    this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
          this.classWrapper(true);
      }
    })
  }
}

function getNumericCellEditor() {
  function isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
  }
  function isKeyPressedNumeric(event) {
    var charCode = getCharCodeFromEvent(event);
    var charStr = String.fromCharCode(charCode);
    return isCharNumeric(charStr);
  }
  function getCharCodeFromEvent(event) {
    event = event || window.event;
    return typeof event.which === 'undefined' ? event.keyCode : event.which;
  }
  function NumericCellEditor() { }
  NumericCellEditor.prototype.init = function (params) {
    this.focusAfterAttached = params.cellStartedEdit;
    this.eInput = document.createElement('input');
    this.eInput.style.width = '100%';
    this.eInput.style.height = '100%';
    this.eInput.value = isCharNumeric(params.charPress)
      ? params.charPress
      : params.value;
    var that = this;
    this.eInput.addEventListener('keypress', function (event) {
      if (!isKeyPressedNumeric(event)) {
        that.eInput.focus();
        if (event.preventDefault) event.preventDefault();
      }
    });
  };
  NumericCellEditor.prototype.getGui = function () {
    return this.eInput;
  };
  NumericCellEditor.prototype.afterGuiAttached = function () {
    if (this.focusAfterAttached) {
      this.eInput.focus();
      this.eInput.select();
    }
  };
  NumericCellEditor.prototype.isCancelBeforeStart = function () {
    return this.cancelBeforeStart;
  };
  NumericCellEditor.prototype.isCancelAfterEnd = function () { };
  NumericCellEditor.prototype.getValue = function () {
    return this.eInput.value;
  };
  NumericCellEditor.prototype.focusIn = function () {
    var eInput = this.getGui();
    eInput.focus();
    eInput.select();
    console.log('NumericCellEditor.focusIn()');
  };
  NumericCellEditor.prototype.focusOut = function () {
    console.log('NumericCellEditor.focusOut()');
  };
  return NumericCellEditor;
}