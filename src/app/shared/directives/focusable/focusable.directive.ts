import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusableDirective {
  @Input() isSidepanel : any = null;
  private element: HTMLElement;
  private hasFocus = false;
  private type;

  constructor($element: ElementRef) {
    this.element = $element.nativeElement;
  }

  ngAfterContentChecked() {
    if(this.isSidepanel !== null){
      this.type = 'sidepanel';
      if(!this.isSidepanel) {
        this.hasFocus = false;
      }
    }
    if(!this.hasFocus) {
      if(this.type === 'sidepanel'){
        if(this.isSidepanel){
          setTimeout(() => {
            this.giveFocus();
          }, 500);
        }
      } else {
        this.giveFocus()
      }
    }
  }

  giveFocus() {
    this.element.focus();
    this.hasFocus = true;
  }
}
