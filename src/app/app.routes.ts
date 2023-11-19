import { RandomColors } from './components/portfolio/random-colors/random-colors-overview/random-colors-overview.component';
import { Routes } from '@angular/router';
import { InnerWrapper } from './components/inner-wrapper/inner-wrapper.component';

export const routes: Routes = [
    {
        path: "",
        component: InnerWrapper,
        children: [
            {
                path: 'portfolio',
                component: RandomColors
            }
        ]
    }
];
