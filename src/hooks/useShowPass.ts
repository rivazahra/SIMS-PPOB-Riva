import { useState } from "react"

export const useShowPass = () =>{
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false)

    const togglePass = () => setShowPass(!showPass)
    const toggleConfirm = ()=> setShowConfirmPass(!showConfirmPass)
    return {togglePass, showPass, toggleConfirm, showConfirmPass}
}