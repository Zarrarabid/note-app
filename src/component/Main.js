import React, { useEffect, useState } from 'react'
import './main.css'
import Searchbar from '../common/SearchBar/Searchbar'
import Modal from '../common/Modal'
import NoteCard from '../common/Notes/noteCard'
function Main() {
    const getNotes = localStorage.getItem("notes") && localStorage.getItem("notes") !== "undefined" ? localStorage.getItem("notes") : null
    const [notes, setNotes] = useState(JSON.parse(getNotes) || [])
    const [filteredNotes, setFilteredNotes] = useState(JSON.parse(getNotes) || [])
    const [valueEdited, setValueEdited] = useState()
    const [selected, setSelected] = useState("All")
    const [openModal, setOpenModal] = useState(false)
    const [saveData, setSaveData] = useState(false)
    const [search, setSearch] = useState("")


    useEffect(() => {
        localStorage.setItem("notes",JSON.stringify(notes))
        // localStorage.removeItem("notes");

        if(notes?.length > filteredNotes?.length) 
            {
                setFilteredNotes(notes)
            }

    },[notes])

    // useEffect(() => {
    //     let temp = [...notes]

    // },[notes])
    return (
        <div className='col-12'>
            {openModal &&
                <div style={{
                    zIndex: 2,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                }}>
                    <Modal
                        setOpenModal={setOpenModal}
                        setNotes={setNotes}
                        notes={notes}
                        valueEdited={valueEdited}
                        setSaveData={setSaveData}
                        saveData={saveData}
                    />
                </div>
            }
            <div style={{ filter: openModal && "blur(8px)" }}>
                <Searchbar
                    setOpenModal={setOpenModal}
                    setNotes={setNotes}
                    notes={notes}
                    setFilteredNotes={setFilteredNotes}
                    filteredNotes={filteredNotes}
                    setSearch={setSearch}
                    search={search}
                    selected={selected}
                />

                <div className='col-12 container'>
                    <div className='d-flex justify-content-between'>
                        <h3 className='fw-bold'>Your Notes</h3>
                        <button 
                    onClick={() => {
                        setSaveData(true)
                        setOpenModal(true)
                    }}
                    className='Save_dataBtn'>
                    Save Data
                </button>
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
                                setFilteredNotes(notes)
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
                                setFilteredNotes(notes?.filter((item) => item?.category?.toLowerCase() == "home"))
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
                                setFilteredNotes(notes?.filter((item) => item?.category?.toLowerCase() == "business"))
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
                                setFilteredNotes(notes?.filter((item) => item?.category?.toLowerCase() == "personal"))
                            }}
                        >
                            Personal
                        </button>
                    </div>
                    <div>
                        <NoteCard
                            setNotes={setNotes}
                            notes={notes}
                            setValueEdited={setValueEdited}
                            valueEdited={valueEdited}
                            setOpenModal={setOpenModal}
                            filteredNotes={filteredNotes}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main