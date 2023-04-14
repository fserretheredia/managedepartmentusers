import { JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilderModel, FormBuilderSave } from './model/form-buider.inteface';
@Component({
  selector: 'app-form-buider',
  templateUrl: './form-buider.component.html',
  styleUrls: ['./form-buider.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgIf,
    InputTextModule,
    ButtonModule,
    RouterModule,
    DropdownModule,
    JsonPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuiderComponent implements OnChanges {
  @Input() form!: FormBuilderModel;
  @Input() title!: string;
  @Output() saveForm: EventEmitter<FormBuilderSave> = new EventEmitter<FormBuilderSave>();

  public formBuilder!: FormGroup;
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);

  ngOnChanges() {
    this._buildForm();
  }

  public cancel() {
    this._router.navigate(this.form.returnRoute);
  }

  public save() {
    this.saveForm.emit(this.formBuilder.value);
  }

  private _buildForm(): void {
    this.formBuilder = this._formBuilder.group({});

    this.form.form.forEach((value) => {
      this.formBuilder.addControl(
        value.attributeName,
        this._formBuilder.control(
          {
            value: value.control.defaultValue,
            disabled: value.dropdownDisabled
          },
          value.control.validators,
        )
      );
    });
  }
}
