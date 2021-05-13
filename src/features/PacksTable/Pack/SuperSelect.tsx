import css from './SuperSelect.module.css'

import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from "react";

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {


    const mappedOptions = options && options.map((t)=> <option value={t} key={t}>{t}</option>); // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {

        console.log(e.currentTarget.value)

        // onChange, onChangeOption
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    return (
        <div className={css.Body}>
            <div className={css.select}>
                <select  name="format" id="format" onChange={onChangeCallback} {...restProps}>

                    {mappedOptions}

                </select>
            </div>

        </div>

    );
}

export default SuperSelect;