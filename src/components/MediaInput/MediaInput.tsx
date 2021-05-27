import React, {ChangeEvent} from "react";
import { useRef } from "react";
import {useDispatch} from "react-redux";

export const MediaInput: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData(); // for send to back

        const newFile = e.target.files && e.target.files[0];

        if (newFile) {
            formData.append('newFile', newFile, newFile.name);
        }
    }

    return <div>
        <input ref={inputRef} type="file" style={{display: 'none'}} onChange={upload}/>
        <button onClick={() => inputRef && inputRef.current && inputRef.current.click()}>Change avatar</button>
    </div>
}
