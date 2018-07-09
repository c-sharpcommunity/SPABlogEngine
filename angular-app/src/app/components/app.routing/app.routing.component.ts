import { Routes, RouterModule } from '@angular/router';
import { LoginComponent   } from '../login/login.component';
import { PostsComponent } from '../posts/posts.component';
import { CanActivateService } from '../../services/canactivate.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { UpdatePostComponent } from '../update-post/update-post.component';
import { CategoriesComponent } from '../categories/categories.component';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
 { path: 'posts', component: PostsComponent, canActivate: [CanActivateService] },
 { path: 'newpost', component: NewPostComponent , canActivate: [CanActivateService]},
 { path: 'updatepost/:id', component: UpdatePostComponent },
 { path: 'categories', component: CategoriesComponent, canActivate: [CanActivateService] },
 { path: 'newcategory', component: NewCategoryComponent , canActivate: [CanActivateService]},
 { path: 'updatecategory/:id', component: UpdateCategoryComponent },

 // otherwise redirect to home
//  { path: '**', component: PageNotFoundComponent }
{ path: '**', component: LoginComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
