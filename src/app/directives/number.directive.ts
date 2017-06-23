import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
    selector: '[number]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: NumberDirective,
        multi: true
    }]
})

export class NumberDirective implements ControlValueAccessor {
    onTouched: any;
    onChange: any;

    @Input('number') number: string;

    writeValue(value: any): void {

    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    regexStr = '^[0-9]*$';
    constructor(private el: ElementRef) { }

    @Input() NumberDirective: boolean;

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent>event;
        if ([8, 9, 37, 39, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105].indexOf(e.keyCode) == -1) {
            e.preventDefault();
            return;
        }
    }

    @HostListener('keyup', ['$event'])
    onKeyup($event: any) {
        var valor = $event.target.value.replace(/\D/g, '');
        var pad = this.number.replace(/\D/g, '').replace(/9/g, '_');
        var valorMask = valor + pad.substring(0, pad.length - valor.length);

        // retorna caso pressionado backspace
        if ($event.keyCode === 8) {
            this.onChange(valor);
            return;
        }

        if (valor.length <= pad.length) {
            this.onChange(valor);
        }

        var valorMaskPos = 0;
        valor = '';
        for (var i = 0; i < this.number.length; i++) {
            if (isNaN(parseInt(this.number.charAt(i)))) {
                valor += this.number.charAt(i);
            } else {
                valor += valorMask[valorMaskPos++];
            }
        }

        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }

        $event.target.value = valor;
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any) {
        if ($event.target.value.length === this.number.length) {
            return;
        }
        this.onChange('');
        $event.target.value = '';
    }
}