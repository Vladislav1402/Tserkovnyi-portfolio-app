import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoaderService {
    loaderStateSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    loaderState$ = this.loaderStateSource.asObservable();
    activeRequests = 0;
    infiniteLoader = false;

    showLoader(): void {
        if (this.activeRequests === 0 || this.infiniteLoader) {
            this.loaderStateSource.next(true);
        }

        this.activeRequests = this.activeRequests + 1;
    }

    hideLoader(): void {
        if (this.activeRequests === 1 && !this.infiniteLoader) {
            this.loaderStateSource.next(false);
        }

        this.activeRequests = this.activeRequests - 1;
    }

    skipLoader(): void {
        this.infiniteLoader = false;
        if (this.activeRequests > 0) {
            this.activeRequests = 1;
            this.hideLoader();
        }
    }

    setInfiniteLoader() {
        this.infiniteLoader = true;
        this.loaderStateSource.next(true);
    }

    closeInfiniteLoader() {
        this.infiniteLoader = false;
        this.loaderStateSource.next(false);
    }
}