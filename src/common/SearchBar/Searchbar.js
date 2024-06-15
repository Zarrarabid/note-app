import React from 'react'
import "./searchbar.css"
function Searchbar(props) {
    const {setOpenModal,setSearch,search} = props
    return (
        <div className=' container py-2 mb-5'>
            <div className="col-12 px-0 d-flex justify-content-between">
                <input type="text" className="search__input w-75" placeholder="Search Notes" />
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