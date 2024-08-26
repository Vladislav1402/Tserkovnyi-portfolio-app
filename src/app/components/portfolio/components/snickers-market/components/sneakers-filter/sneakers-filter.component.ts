import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, OnInit } from '@angular/core';

@Component({
    selector: 'app-sneakers-filter',
    templateUrl: './sneakers-filter.component.html',
    styleUrls: ['./sneakers-filter.component.scss'],
    standalone:true,
    imports: [ FormsModule],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => SneakersFilter),
          multi: true,
        },
      ],
})

export class SneakersFilter  {
    _value = ''

    writeValue(value: string) {
        this._value = value;
      }
    
      onTouched = () => {};
    
      onChange: (value: any) => void = () => {};
    
      preOnChange(event: any) {
        this.onChange(event.target.value);
      }
    
      registerOnChange(onChange: (value: string) => void) {
        this.onChange = onChange;
      }
    
      registerOnTouched(onTouched: () => void) {
        this.onTouched = onTouched;
      }

}