import { Validators } from '@angular/forms';
import { FormBuilderAttrModel } from 'src/app/shared/components/form-buider/model/form-buider.inteface';
import { Department, User } from 'src/app/shared/models';
import { mailRegexp } from 'src/app/shared/utils/regExp';

export const getUserFormConfig = (
  departmentSelected: Department,
  departments: Department[],
  user: User,
  isCreatePage: boolean
): FormBuilderAttrModel[] => {
  return [
    {
      attributeName: 'department',
      label: 'Department ',
      description: '',
      control: {
        defaultValue: user
          ? _findDeprtamentUserEdit(departments, user)
          : {
              id: departmentSelected.id,
              name: departmentSelected.name,
            },
        validators: [Validators.required],
      },
      typeInput: 'dropdown',
      dropdownOption: departments.map(({ id, name }) => ({
        id,
        name,
      })),
      dropdownDisabled: isCreatePage,
    },
    {
      attributeName: 'name',
      label: 'Name ',
      description: '',
      control: {
        defaultValue: user ? user.name : '',
        validators: [Validators.required],
      },
      typeInput: 'text',
    },
    {
      attributeName: 'email',
      label: 'Email ',
      description: '',
      control: {
        defaultValue: user ? user.email : '',
        validators: [Validators.required, Validators.pattern(mailRegexp)],
      },
      typeInput: 'text',
    }
  ];
};

const _findDeprtamentUserEdit = (
  departments: Department[],
  user: User
): { id: number; name: string } => {
  const findDepartment = departments.find((dep: Department) =>
    dep.users.includes(user.id)
  );
  return {
    id: findDepartment ? findDepartment?.id : 0,
    name: findDepartment ? findDepartment?.name : '',
  };
};
