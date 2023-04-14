import { ValidatorFn } from "@angular/forms";


export interface FormBuilderAttrModel {
  attributeName: string;
  label: string;
  description: string;
  control: {
    defaultValue: unknown;
    validators: ValidatorFn | ValidatorFn[];
  };
  typeInput: string;
  dropdownOption?: any[];
  dropdownDisabled?: boolean;
  hidden?: boolean;
}

export interface FormBuilderModel {
  form: FormBuilderAttrModel[],
  returnRoute: string[]
}

export interface FormBuilderSave { [key: string]: unknown } 