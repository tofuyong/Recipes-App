import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsComponent } from './components/details.component';
import { ListingComponent } from './components/listing.component';

const routes: Routes = [
    { path: '', component: ListingComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }