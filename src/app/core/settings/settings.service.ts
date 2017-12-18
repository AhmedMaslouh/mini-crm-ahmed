import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
declare var $: any;

@Injectable()
export class SettingsService {

    private user: any;
    private app: any;
    public layout: any;
    public build: any;

    constructor(public http: Http) {

        this.build = this.initBuild();

        // User Settings
        // -----------------------------------
        this.user = {
            name: 'John',
            job: 'ng-developer',
            picture: 'assets/img/user/02.jpg'
        };

        // App Settings
        // -----------------------------------
        this.app = {
            name: 'Mini CRM',
            description: 'Gestion des contacts',
            year: ((new Date()).getFullYear())
        };

        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: null,
            asideScrollbar: false,
            isCollapsedText: false,
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

        this.getBuildInfo().subscribe(
          res => {
            this.build = res;
            this.build.front.commit = this.build.front.commit.substr(0,6);
            this.build.back.commit = this.build.back.commit.substr(0,6);
          },
          err => this.build = null
        );

    }

    getAppSetting(name) {
        return name ? this.app[name] : this.app;
    }
    getUserSetting(name) {
        return name ? this.user[name] : this.user;
    }
    getLayoutSetting(name) {
        return name ? this.layout[name] : this.layout;
    }
    getBuildInfo() {
        return this.http.get('../../../assets/build.version.json').map(res => res.json());
    }

    setAppSetting(name, value) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    }
    setUserSetting(name, value) {
        if (typeof this.user[name] !== 'undefined') {
            this.user[name] = value;
        }
    }
    setLayoutSetting(name, value) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }

    initBuild() {
      let version = {
        version:"DEV-0",
        front:{
          buildNb:"front-0",
          commit:"0000000000"
        },
        back:{
          buildNb:"back-0",
          commit:"0000000000"
        }
      };

      return version;
    }

    toggleLayoutSetting(name) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }

}
