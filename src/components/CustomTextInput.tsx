import React, {ChangeEvent, useState} from "react";

export const CustomTextInput: React.FC<any> = (props) => {
    const [value, setValue] = useState<string>()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return <input {...props} value={value} onChange={handleChange}/>
}