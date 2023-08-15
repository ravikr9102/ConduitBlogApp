import React from "react"

export default function Pagination(props) {
    let {articlesCount, articlesPerPage, updateCurrentPageIndex} = props;
    let numberOfPages = Math.floor(articlesCount / articlesPerPage);
    console.log(numberOfPages);
    let pagesArray = []

    for(let i = 1; i <=numberOfPages; i++){
        pagesArray.push(i)
    }

    return(
       <div className="flex justify-center items-center">
        <ul className="flex flex-wrap">
        {
            pagesArray.map((page,i) => (
                <li key={i} onClick={() => updateCurrentPageIndex(page)} className={`text-green-500 border border-green-500 px-4 py-2 m-2 cursor-pointer hover:bg-green-500 hover:text-white`}>{page}</li>
            ))
        }
        </ul>
       </div>
    )
}