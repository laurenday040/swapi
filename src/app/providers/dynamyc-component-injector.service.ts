import { Injectable, ComponentFactoryResolver, OnDestroy, ComponentRef, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

@Injectable()
export class DynamicComponentInjector implements OnDestroy {
    private cr: ComponentRef<any>;
    private componentRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {

    }

    ngOnDestroy() {

    }

    public inject(component: any) {
        if (!this.componentRef) {
            // 1. Create a component reference from the component 
            this.componentRef = this.componentFactoryResolver
                .resolveComponentFactory(component)
                .create(this.injector);

            // 2. Attach component to the appRef so that it's inside the ng component tree
            this.appRef.attachView(this.componentRef.hostView);

            // 3. Get DOM element from component
            const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
                .rootNodes[0] as HTMLElement;

            // 4. Append DOM element to the body
            document.body.appendChild(domElem);
        }

    }

    public destroy() {
        if(this.componentRef){
            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef = null;
        }
    }


}