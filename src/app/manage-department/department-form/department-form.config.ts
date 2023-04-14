import { Validators } from '@angular/forms';
import { FormBuilderAttrModel } from 'src/app/shared/components/form-buider/model/form-buider.inteface';
import { Department } from 'src/app/shared/models';

export const getDepartmentFormConfig = (
  departmentSelected: Department
): FormBuilderAttrModel[] => {
  return [
    {
      attributeName: 'name',
      label: 'Name ',
      description: 'new department name',
      control: {
        defaultValue: departmentSelected ? departmentSelected.name : '',
        validators: [Validators.required],
      },
      typeInput: 'text',
    }
  ];
};
