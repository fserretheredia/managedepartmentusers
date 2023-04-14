import { EffectsModule } from "@ngrx/effects";
import { DepartmentEffect } from "./department/department.effect";
import { UserDepartmentEffect } from "./user-department/user-department.effect";

const EFFECTS = [
    DepartmentEffect,
    UserDepartmentEffect
];

export const SHARED_EFFECTS = EffectsModule.forFeature(EFFECTS)

export * from "./department/department.effect";
export * from "./user-department/user-department.effect";
