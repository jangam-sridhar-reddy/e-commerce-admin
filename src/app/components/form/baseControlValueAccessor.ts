import { ControlValueAccessor } from "@angular/forms";

export class BaseControlValueAccessor<T> implements ControlValueAccessor{

    isDisabled:boolean = false;

    value!:T;

    onChange(newVal: T){}

    onTouched(_?:any){

    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }
    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled
    }

    writeValue(obj: any): void {
        this.value = obj
    }
}