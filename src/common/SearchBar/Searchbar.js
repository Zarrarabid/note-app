import React, { useState } from 'react'
import "./searchbar.css"
function Searchbar(props) {
    const {
        setOpenModal,
        notes,
        search,
        setSearch,
        setFilteredNotes,
        filteredNotes,
        selected,
        screen
    } = props
    return (
        <div className=' container py-2 mb-5'>
            <div className={screen <= 500 ? "col-12 px-0 d-flex flex-column gap-2" : "col-12 px-0 d-flex justify-content-between"}>
                <input 
                    type="text" 
                    className={screen <= 500 ? "search__input w-100" : "search__input w-75" }
                    placeholder="Search Notes" 
                    value={search}
                    onChange={(e) => {
                        const value = e.target.value
                        setSearch(value)
                        if(value){
                            setFilteredNotes(filteredNotes?.filter((item) => item?.title?.toLowerCase()?.includes(value?.toLowerCase())))
                        }
                        else{
                            selected?.toLowerCase() == "all" ? setFilteredNotes(notes) :
                            selected?.toLowerCase() == "business" ? setFilteredNotes(notes?.filter((item) => item?.category?.toLowerCase() == "business")) :
                            selected?.toLowerCase() == "personal" ? setFilteredNotes(notes?.filter((item) => item?.category?.toLowerCase() == "personal")) :
                            setFilteredNotes(notes?.filter((item) => item?.category?.toLowerCase() == "home"))
                        }

                    }}
                    />
                <button 
                    onClick={() => setOpenModal(true)}
                    className={screen <= 500 ? "modal_action col-12" : 'modal_action'}>
                    Add
                </button>
            </div>
            
        </div>
    )
}

export default Searchbar