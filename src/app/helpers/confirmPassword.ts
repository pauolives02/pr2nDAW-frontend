import { FormGroup } from "@angular/forms";

export function ConfirmPassword(password: string, confirmPassword: string) {
  return (formGroup: FormGroup) => {

    const passwordControl = formGroup.controls[password]
    const confirmPasswordControl = formGroup.controls[confirmPassword]

    if (!passwordControl || !confirmPasswordControl) return null

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['confirmPassword']) return null


    passwordControl.value !== confirmPasswordControl.value
      ? confirmPasswordControl.setErrors({ confirmPassword: true })
      : confirmPasswordControl.setErrors(null)
  }
}