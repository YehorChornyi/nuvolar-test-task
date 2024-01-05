import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * class that has helper methods for reactive forms validation
 */
export class ValidationHelper {
    static whitespaceValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const { value } = control;

            if (!value) {
                return null;
            }

            return value.trim().length === 0 ? { whitespace: true } : null;
        };
    }
}
