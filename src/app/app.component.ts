import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd  } from '@angular/router';
import { MessagesService, CustomPreloadingStrategyService } from './core';
import { SpinnerService } from './widgets';
import { Title } from '@angular/platform-browser';

// rxjs
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private sub: Subscription;

  constructor(
    public messagesService: MessagesService,
    private router: Router,
    public spinnerService: SpinnerService,
    private preloadingStrategy: CustomPreloadingStrategyService,
    private titleService: Title
  ) { }

  ngOnInit() {
    console.log(
      `Preloading Modules: `,
      this.preloadingStrategy.preloadedModules
    );
    // this.setPageTitles();
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }


  onActivate(event: any, routerOutlet: RouterOutlet) {
    console.log('Activated component', event, routerOutlet);
    // another way to set titles or use setPageTitles and unsubscribe in destroy
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);

  }
  onDeactivate(event: any, routerOutlet: RouterOutlet) {
    console.log('Deactivated component', event, routerOutlet);
  }

  onDisplayMessages() {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }

  private setPageTitles() {
    this.sub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data)
      )
      .subscribe(
        data => this.titleService.setTitle(data.title)
      );
  }

}
