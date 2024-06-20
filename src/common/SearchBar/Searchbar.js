import React, { useState } from 'react'
import "./searchbar.css"
function Searchbar(props) {
    const {setOpenModal,notes,search,setSearch,setFilteredNotes,filteredNotes,selected} = props
    return (
        <div className=' container py-2 mb-5'>
            <div className="col-12 px-0 d-flex justify-content-between">
                <input 
                    type="text" 
                    className="search__input w-75" 
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
                    className='modal_action'>
                    Add
                </button>
            </div>
            
        </div>
    )
}

export default Searchbar