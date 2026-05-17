import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";


import { ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from "./views/index/index.component";

@NgModule({
  declarations: [
    AppComponent,

    IndexComponent,
    
  ],
  imports: [BrowserModule, AppRoutingModule,
        ReactiveFormsModule // ✅ Add this

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
