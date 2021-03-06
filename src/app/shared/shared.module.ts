import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "ng2-translate/ng2-translate";
import {ToasterModule} from "angular2-toaster/angular2-toaster";
import {HttpModule} from "@angular/http";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {AlertModule} from "ngx-bootstrap/alert";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {ModalModule} from "ngx-bootstrap/modal";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {RatingModule} from "ngx-bootstrap/rating";
import {TabsModule} from "ngx-bootstrap/tabs";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {SidebarModule} from "ng-sidebar";
import {FlotDirective} from "./directives/flot/flot.directive";
import {SparklineDirective} from "./directives/sparkline/sparkline.directive";
import {EasypiechartDirective} from "./directives/easypiechart/easypiechart.directive";
import {ColorsService} from "./colors/colors.service";
import {CheckallDirective} from "./directives/checkall/checkall.directive";
import {VectormapDirective} from "./directives/vectormap/vectormap.directive";
import {NowDirective} from "./directives/now/now.directive";
import {ScrollableDirective} from "./directives/scrollable/scrollable.directive";
import {JqcloudDirective} from "./directives/jqcloud/jqcloud.directive";
import {AgGridModule} from "ag-grid-angular/main";
import {AuthGuardService} from "../api/guards/auth-guard.service";
import {AutoCompleteModule, CalendarModule, FieldsetModule, FileUploadModule, MultiSelectModule} from "primeng/primeng";
import {FocusableDirective} from "./directives/focusable/focusable.directive";
import {NgxPaginationModule} from "ngx-pagination";
/*
 The presence of moment.js in DatepickerModule breaks lazyload. See:
 https://github.com/angular/angular-cli/issues/2496
 https://github.com/valor-software/ng2-bootstrap/issues/1187
 */

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    HttpModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    //NgxMyDatePickerModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    //.forRoot() DatepickerModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    ToasterModule,
    SidebarModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    ColorsService,
  ],
  declarations: [
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    FocusableDirective
  ],
  exports: [
    NgxPaginationModule,
    AgGridModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    AccordionModule,
    AlertModule,
    ButtonsModule,
    CarouselModule,
    CollapseModule,
    // DatepickerModule,
    ModalModule,
    PaginationModule,
    ProgressbarModule,
    RatingModule,
    TabsModule,
    TooltipModule,
    TypeaheadModule,
    ToasterModule,
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    SidebarModule,
    CalendarModule,
    MultiSelectModule,
    FieldsetModule,
    AutoCompleteModule,
    FileUploadModule,
    FocusableDirective
  ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
