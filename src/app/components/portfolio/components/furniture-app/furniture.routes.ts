import { FurnitureContacts } from './components/contacts/furniture-contacts.component';
import { FurnitureBlog } from './components/blog/furniture-blog.component';
import { FurnitureGallery } from './components/gallery/gallery.component';
import { FurnitureAbout } from './components/about/furniture-about.component';
import { FurnitureHomePage } from './views/home-page/home-page.component';
import { Routes } from "@angular/router";
import { FurnitureMain } from './components/main/furniture-main.component';

export const furnitureRoutes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full",
    },
    {
        path: "home",
        component: FurnitureHomePage,
        children: [
            {
                path: "",
                redirectTo: '/home/main',
                pathMatch: 'full'
            },
            {
                path:"main",
                component: FurnitureMain
            },
            {
                path: 'about',
                component: FurnitureAbout
            },
            {
                path: 'gallery',
                component: FurnitureGallery
            },
            {
                path: 'blog',
                component: FurnitureBlog
            },
            {
                path: 'contacts',
                component: FurnitureContacts
            }
        ]
    }
]