import { Routes, RouterModule } from '@angular/router';
import { LoginComponent   } from '../login/login.component';
import { NewcarComponent } from '../newcar/newcar.component';
import { ListComponent } from '../list/list.component';
import { CanActivateService } from '../../services/canactivate.service';
import { UpdatecarComponent } from './../updatecar/update.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
 { path: 'list', component: ListComponent, canActivate: [CanActivateService] },
 { path: 'newcar', component: NewcarComponent , canActivate: [CanActivateService]},
 { path: 'updatecar/:id', component: UpdatecarComponent },

 // otherwise redirect to home
 { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
