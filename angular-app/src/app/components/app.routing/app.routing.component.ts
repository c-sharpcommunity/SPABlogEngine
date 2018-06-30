import { Routes, RouterModule } from '@angular/router';
import { LoginComponent   } from '../login/login.component';
import { ListComponent } from '../list/list.component';
import { CanActivateService } from '../../services/canactivate.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { UpdatePostComponent } from '../update-post/update-post.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
 { path: 'list', component: ListComponent, canActivate: [CanActivateService] },
 { path: 'newpost', component: NewPostComponent , canActivate: [CanActivateService]},
 { path: 'updatepost/:id', component: UpdatePostComponent },

 // otherwise redirect to home
 { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
