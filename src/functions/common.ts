import { ValidationError } from "../types/users";

export const getValidationErrorByFieldName = (fieldName: string, validationErrors: ValidationError[] | null) => {
    if(!validationErrors) return
    let fieldErrors = validationErrors.filter(error => error.param === fieldName)
    if(!fieldErrors.length) return
    let errorText = ''
    for(let error of fieldErrors) {
        if(!errorText) {
            errorText += ` ${error.msg}`
        } else errorText += error.msg
    }
    if(!errorText) return
    return errorText
}