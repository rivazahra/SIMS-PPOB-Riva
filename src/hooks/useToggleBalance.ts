import { useState } from "react"

export const useToggleBalance = () =>{
    const [showBalance, setShowBalance] = useState(false);

    const toggleBalance = () =>setShowBalance(!showBalance)
    return {toggleBalance, showBalance}
}