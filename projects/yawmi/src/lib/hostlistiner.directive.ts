import { Directive, ElementRef, ViewChild, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[libHostlistiner]'
})
export class HostlistinerDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) { }

	@HostListener('click') onClick(){
		this.hostListChange();
	}

	hostListChange(){

		let selectParent = this.renderer.parentNode(this.el.nativeElement);
		let allElements = selectParent.querySelector('.selected');
		
		if(allElements) {
	      this.renderer.removeClass(allElements, 'selected');
	    }
	    // console.log(this.el.nativeElement.getAttribute('month'));
		this.renderer.addClass(this.el.nativeElement, 'selected');
	}
}