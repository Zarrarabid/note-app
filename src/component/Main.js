import React, { useState } from 'react'
import './main.css'
import Searchbar from '../common/SearchBar/Searchbar'
import Modal from '../common/Modal'
import NoteCard from '../common/Notes/noteCard'
function Main() {
    const getNotes = sessionStorage.getItem("notes") && sessionStorage.getItem("notes") !== "undefined" ? sessionStorage.getItem("notes") : null
    const tempArr = JSON.parse(getNotes) || []
    const [notes, setNotes] = useState(JSON.parse(getNotes) || [])
    const [search, setSearch] = useState("")
    const [valueEdited, setValueEdited] = useState()
    const [selected, setSelected] = useState("All")
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className='col-12'>
            {openModal &&
                <div style={{
                    zIndex: 2,
                    position: "absolute",
                    left: "50%",
                    top: "30%",
                    transform: "translate(-50%,-50%)"
                }}>
                    <Modal
                        setOpenModal={setOpenModal}
                        setNotes={setNotes}
                        notes={notes}
                        valueEdited={valueEdited}
                    />
                </div>
            }
            <div style={{ filter: openModal && "blur(8px)" }}>
                <Searchbar
                    setOpenModal={setOpenModal}
                    setSearch={setSearch}
                    search={search}
                />

                <div className='col-12 container'>
                    <div>
                        <h3 className='fw-bold'>Your Notes</h3>
                    </div>
                    <div>
                        <button
                            style={{
                                borderBottom: selected == "All" ?
                                    "2px solid black" :
                                    "2px solid rgba(0,0,0,0.2)",
                            }}
                            className='header-menu py-2 px-5'
                            onClick={() => {
                                setSelected("All")
                            }}
                        >
                            All
                        </button>
                        <button
                            style={{
                                borderBottom: selected == "Home" ?
                                    "2px solid black" :
                                    "2px solid rgba(0,0,0,0.2)",
                            }}
                            className='header-menu py-2 px-5'
                            onClick={() => {
                                setSelected("Home")
                            }}
                        >
                            Home
                        </button>
                        <button
                            style={{
                                borderBottom: selected == "Business" ?
                                    "2px solid black" :
                                    "2px solid rgba(0,0,0,0.2)",
                            }}
                            className='header-menu py-2 px-5'
                            onClick={() => {
                                setSelected("Business")
                            }}
                        >
                            Business
                        </button>
                        <button
                            style={{
                                borderBottom: selected == "Personal" ?
                                    "2px solid black" :
                                    "2px solid rgba(0,0,0,0.2)",
                            }}
                            className='header-menu py-2 px-5'
                            onClick={() => {
                                setSelected("Personal")
                            }}
                        >
                            Personal
                        </button>
                    </div>
                    <div>
                        <NoteCard
                            tempArr={tempArr}
                            setNotes={setNotes}
                            notes={notes}
                            setValueEdited={setValueEdited}
                            valueEdited={valueEdited}
                            setOpenModal={setOpenModal}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main