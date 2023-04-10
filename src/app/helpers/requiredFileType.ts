import { FormControl } from "@angular/forms";

export function requiredFileType() {
  return function (control: FormControl) {
    const file = control.value
   
    if (file) {
      const extensions = ['png', 'jpg', 'jpeg', 'webp']
      const extension = file.name.split('.')[1].toLowerCase()
      
      if (!extensions.includes(extension)) {
        return { requiredFileType: true }
      }
      
      return null
    }
    
    return null
  }
}