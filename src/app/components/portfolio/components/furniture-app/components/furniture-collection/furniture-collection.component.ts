import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';


@Component({
    selector: 'app-furniture-collection',
    templateUrl: './furniture-collection.component.html',
    styleUrls: ['./furniture-collection.component.scss'],
    standalone: true,
    imports: [CommonModule],
    animations: [
        trigger('fadeInOut', [
            transition('* => *', [
                style({ opacity: 0, transform: 'scale(0.5)' }),
                animate('500ms ease-in', style({ opacity: 1, transform: 'scale(1)' })),

            ]),
        ]),
    ],
})

export class FurnitureCollection {
    @Input() isGallery: boolean = false;
    selectedCollection = "bedroom"

    furnitureCollection: any = {
        bedroom: [
            { label: '/assets/images/bedroom_2.jpg', isMain: true },
            { label: '/assets/images/bedroom_3.jpg', isMain: true },
            { label: '/assets/images/bedroom_5.jpg', isMain: true },
            { label: '/assets/images/bedroom_1.jpg', isMain: true },
            { label: '/assets/images/bedroom_4.jpg', isMain: true },
            { label: '/assets/images/bedroom_2.jpg', isMain: false },
            { label: '/assets/images/bedroom_1.jpg', isMain: false },
            { label: '/assets/images/bedroom_4.jpg', isMain: false },
            { label: '/assets/images/bedroom_3.jpg', isMain: false },
            { label: '/assets/images/bedroom_5.jpg', isMain: false },
        ],
        livingRoom: [
            { label: "/assets/images/1 page/jpg/gallery1.jpg", isMain: true },
            { label: "/assets/images/1 page/jpg/gallery2.jpg", isMain: true },
            { label: "/assets/images/1 page/jpg/gallery3.jpg", isMain: true },
            { label: "/assets/images/1 page/jpg/gallery4.jpg", isMain: true },
            { label: "/assets/images/1 page/jpg/gallery5.jpg", isMain: true },
            { label: "/assets/images/1 page/jpg/gallery1.jpg", isMain: false },
            { label: "/assets/images/1 page/jpg/gallery5.jpg", isMain: false },
            { label: "/assets/images/1 page/jpg/gallery3.jpg", isMain: false },
            { label: "/assets/images/1 page/jpg/gallery2.jpg", isMain: false },
            { label: "/assets/images/1 page/jpg/gallery4.jpg", isMain: false },
        ],
        office: [
            { label: "/assets/images/office_4.jpg", isMain: true },
            { label: "/assets/images/office_1.jpg", isMain: true },
            { label: "/assets/images/office_2.avif", isMain: true },
            { label: "/assets/images/office_3.jpg", isMain: true },
            { label: "/assets/images/office_5.jpg", isMain: true },
            { label: "/assets/images/office_4.jpg", isMain: false },
            { label: "/assets/images/office_1.jpg", isMain: false },
            { label: "/assets/images/office_3.jpg", isMain: false },
            { label: "/assets/images/office_5.jpg", isMain: false },
            { label: "/assets/images/office_2.avif", isMain: false },

        ],
        dining: [
            { label: "/assets/images/dining_3.jpg", isMain: true },
            { label: "/assets/images/dining_1.avif", isMain: true },
            { label: "/assets/images/dining_2.avif", isMain: true },
            { label: "/assets/images/dining_4.jpg", isMain: true },
            { label: "/assets/images/dining_5.webp", isMain: true },
            { label: "/assets/images/dining_2.avif", isMain: false },
            { label: "/assets/images/dining_4.jpg", isMain: false },
            { label: "/assets/images/dining_5.webp", isMain: false },
            { label: "/assets/images/dining_3.jpg", isMain: false },
            { label: "/assets/images/dining_1.avif", isMain: false },
        ],
        chairs: [
            { label: "/assets/images/chair_1.webp", isMain: true },
            { label: "/assets/images/chair_2.jpg", isMain: true },
            { label: "/assets/images/chair_3.jpg", isMain: true },
            { label: "/assets/images/chair_4.jpg", isMain: true },
            { label: "/assets/images/chair_5.avif", isMain: true },
            { label: "/assets/images/chair_1.webp", isMain: false },
            { label: "/assets/images/chair_2.jpg", isMain: false },
            { label: "/assets/images/chair_3.jpg", isMain: false },
            { label: "/assets/images/chair_4.jpg", isMain: false },
            { label: "/assets/images/chair_5.avif", isMain: false }
        ]
    }

    collectionButtons: any = [
        { id: 'bedroom', label: 'Bedroom furniture' },
        { id: 'livingRoom', label: 'Living room furniture' },
        { id: 'office', label: 'Office furniture' },
        { id: 'dining', label: 'Dining room futniture' },
        { id: 'chairs', label: 'Chair' },

    ]

    ngOnInit() {
        if(this.isGallery){
            this.changeCollection()
        }
    }

    changeCollection() {
        this.furnitureCollection[this.selectedCollection].map((item: any) => item.isMain = true)
    }

    onChooseCollection(id: string) {
        this.selectedCollection = id;
        if (this.isGallery) {
            this.changeCollection()
        }
    }

}