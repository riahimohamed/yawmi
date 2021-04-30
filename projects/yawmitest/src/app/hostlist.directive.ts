import { Directive, ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHostlist]'
})
export class HostlistDirective {

	cellsBody = document.querySelector('.day-slot ul');

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
		this.renderer.addClass(this.el.nativeElement, 'selected');
	}
}
