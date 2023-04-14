import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SHARED_SERVICE } from "./services";
import { SHARED_EFFECTS } from "./state/effects";
import { SHARED_STORE_FACADES } from "./state/facade";
import { SHARED_STORE } from "./state/reducers";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SHARED_EFFECTS,
    SHARED_STORE
  ],
  providers: [...SHARED_SERVICE],
})
export class SharedModule {}
