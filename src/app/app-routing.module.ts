import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HubComponent } from './hub/hub.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SearchComponent }   from './search/search.component'

const routes: Routes = [
  {path:'hub',component: HubComponent},
  {path:'about',component: AboutComponent},
  {path:'contacts',component: ContactsComponent},
  {path:'search',component: SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
