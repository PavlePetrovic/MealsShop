import { useState } from "react"

const useInput = (validationHandler) => {
   const [value, setValue] = useState('')
   const [isTouched, setIsTouched] = useState(false)

   const isValid = validationHandler(value)
   const isInvalid = !isValid && isTouched

   const setValueHandler = (e) => {
      setValue(e.target.value)
   }

   const setBlurHandler = () => {
      setIsTouched(true)
   }

   const reset = () => {
      setValue('')
      setIsTouched(false)
   }

   return {
      value,
      isValid,
      isInvalid,
      setValueHandler,
      setBlurHandler,
      reset
   }
}

export default useInput