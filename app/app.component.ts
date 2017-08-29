import { combineAll } from 'rxjs/operator/combineAll';
import { Component, ComponentRef, ViewContainerRef, ViewChild, AfterContentInit, ComponentFactoryResolver } from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
        <div>
           <button (click)="destroyComponent()" > Destroy </button>
           <button (click)="moveComponent()" >  Move </button>
           <div #entry></div>
        </div>
  `
})
export class AppComponent implements AfterContentInit {

      component: ComponentRef<AuthFormComponent>;

      @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

      constructor(private resolver: ComponentFactoryResolver) {


      }

      ngAfterContentInit() {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
        const auhtFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
        this.entry.createComponent(auhtFormFactory);

        this.component = this.entry.createComponent(auhtFormFactory, 0);
        console.log(this.component.instance);

        this.component.instance.title = 'Create account';
        this.component.instance.submitted.subscribe(this.loginUser);
      }

      destroyComponent() {
        console.log(this.component);
        this.component.destroy();
      }

      moveComponent(){
        this.entry.move(this.component.hostView, 1);
      }


      createUser(user: User) {
        console.log('Create account', user);

      }

      loginUser(user: User) {
        console.log('Login', user);
      }

}