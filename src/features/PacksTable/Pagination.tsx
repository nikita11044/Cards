import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {cardCountAC} from "../PacksTable/Pack/reducer-search";
import SuperSelect from "../PacksTable/Pack/SuperSelect";
import {AppRootStateType} from "../../app/store";


const Pagination = () => {
    const pagesCount = useSelector<AppRootStateType,number>((state)=>state.search.cardPageTotalCount)
    const portionSize = useSelector<AppRootStateType,number>((state)=>state.search.count)
    let pageCount = Math.ceil(pagesCount/portionSize)
    let pageList = []
    for(let i=0; i<pageCount;i++){
        pageList.push(i)
    }
    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    const dispatch = useDispatch()
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(cardCountAC(+e))
    }
    return (
        <div>
           {/* <SuperSelect onChangeOption={onChangeHandler} options={['3','4','5','6','7','8','9']}/>*/}
            {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
            {pageList
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span style={{width:'30px',display:'alignItems'}}
                    >{p}-</span>
                })}
            {portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>
                NEXT</button>}
        </div>
    )
}

export default Pagination;