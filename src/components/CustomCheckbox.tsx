import React, {ChangeEvent, useState} from "react";

export const CustomCheckbox: React.FC<any> = (props) => {
    const [checked, setChecked] = useState<boolean>()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.checked)
    }

    return <input {...props} type="checkbox" checked={checked} onChange={handleChange}/>
}