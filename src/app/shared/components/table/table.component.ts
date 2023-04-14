import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableData, TableDataRowActions } from './model/table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [TableModule, NgFor, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() dataTable!: TableData<unknown>;
  @Output() selectRow: EventEmitter<{
    idTable: string;
    rowValue: unknown;
    selectRow: boolean;
  }> = new EventEmitter<{
    idTable: string;
    rowValue: unknown;
    selectRow: boolean;
  }>();
  @Output() selectAction: EventEmitter<{
    action: string;
    rowData: unknown;
    idTable: string;
  }> = new EventEmitter<{
    action: string;
    rowData: unknown;
    idTable: string;
  }>();

  public tableDataRowActions = TableDataRowActions;

  public trackByTableItem = (index: number, item: any) => item;

  public selectRowTable(value: unknown, idTable: string, selectRow: boolean) {
    this.selectRow.emit({
      idTable,
      rowValue: value,
      selectRow,
    });
  }

  public selectActionCell(
    event: Event,
    action: string,
    rowData: unknown,
    idTable: string
  ) {
    event.stopPropagation();
    this.selectAction.emit({ action, rowData, idTable });
  }
}
