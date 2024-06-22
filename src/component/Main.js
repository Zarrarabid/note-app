import React, { useEffect, useState } from "react";
import "./main.css";
import Searchbar from "../common/SearchBar/Searchbar";
import Modal from "../common/Modal";
import NoteCard from "../common/Notes/noteCard";
import Loader from "../common/Loader/Loader"
import { ToastContainer } from "react-toastify";
import logo from "../assets/logo.png";
import logoBlackTheme from "../assets/logoblacktheme.png";
function Main({ toggleTheme, theme }) {
  const getNotes =
    localStorage.getItem("notes") &&
    localStorage.getItem("notes") !== "undefined"
      ? localStorage.getItem("notes")
      : null;
  const [notes, setNotes] = useState(JSON.parse(getNotes) || []);
  const [filteredNotes, setFilteredNotes] = useState(
    JSON.parse(getNotes) || []
  );
  const [valueEdited, setValueEdited] = useState();
  const [selected, setSelected] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [search, setSearch] = useState("");
  const [screen, setScreen] = useState();


  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    // setNotes(JSON.parse(getNotes))
    // if (notes?.length > filteredNotes?.length) {
      setFilteredNotes(notes);
    // }
  }, [notes,loader]);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window?.outerWidth);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="col-12">
      <ToastContainer 
      theme={theme ? "light" : "dark"}
      />

      {openModal && (
        <div
          style={{
            zIndex: 2,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: screen <= 500 ? "90%" : "",
          }}
        >
          <Modal
            setOpenModal={setOpenModal}
            setNotes={setNotes}
            notes={notes}
            valueEdited={valueEdited}
            setValueEdited={setValueEdited}
            setDeleteData={setDeleteData}
            deleteData={deleteData}
            theme={theme}
            setLoader={setLoader}
          />
        </div>
      )}
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
          screen={screen}
          toggleTheme={toggleTheme}
          theme={theme}
        />

        <div className="col-12 container">
          <div className="d-flex justify-content-center mb-5">
            <img
              src={theme ? logo : logoBlackTheme}
              alt="logo Image"
              style={{
                height: "100px",
              }}
            />
          </div>

          

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button
                id={selected == "All" ? "header-Menu-Active" : "header-menu"}
                className={screen <= 500 ? " p-2" : " py-2 px-5"}
                onClick={() => {
                  setSelected("All");
                  setFilteredNotes(notes);
                }}
              >
                All
              </button>
              <button
                id={selected == "Home" ? "header-Menu-Active" : "header-menu"}
                className={screen <= 500 ? " p-2" : " py-2 px-5"}
                onClick={() => {
                  setSelected("Home");
                  setFilteredNotes(
                    notes?.filter(
                      (item) => item?.category?.toLowerCase() == "home"
                    )
                  );
                }}
              >
                Home
              </button>
              <button
                id={
                  selected == "Business" ? "header-Menu-Active" : "header-menu"
                }
                className={screen <= 500 ? "p-2" : "py-2 px-5"}
                onClick={() => {
                  setSelected("Business");
                  setFilteredNotes(
                    notes?.filter(
                      (item) => item?.category?.toLowerCase() == "business"
                    )
                  );
                }}
              >
                Business
              </button>
              <button
                id={
                  selected == "Personal" ? "header-Menu-Active" : "header-menu"
                }
                className={screen <= 500 ? " p-2" : " py-2 px-5"}
                onClick={() => {
                  setSelected("Personal");
                  setFilteredNotes(
                    notes?.filter(
                      (item) => item?.category?.toLowerCase() == "personal"
                    )
                  );
                }}
              >
                Personal
              </button>
            </div>
            <svg
              onClick={() => {
                setDeleteData(true);
                setOpenModal(true);
              }}
              style={{
                cursor: "pointer",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path
                fill={theme ? "#FF6969" : "white"}
                d="M21 0c-1.645 0-3 1.355-3 3v1H9.687c-1.222 0-2.042.895-2.468 2h-.125C4.844 6 3 7.867 3 10.188V11c0 .55.45 1 1 1h1.125l5.094 34.75C10.489 48.637 12.125 50 14 50h22c1.875 0 3.398-1.395 3.781-3.188v-.062L44.875 12H46c.55 0 1-.45 1-1v-.813C47 7.867 45.156 6 42.906 6h-.125c-.426-1.105-1.246-2-2.468-2H32V3c0-1.645-1.355-3-3-3zm0 2h8c.555 0 1 .445 1 1v1H20V3c0-.555.445-1 1-1zM9.687 6h30.626c.398 0 .874.445.874 1 0 .55.45 1 1 1h.72c1.081 0 1.929.836 2.03 2H5.063c.101-1.164.949-2 2.03-2h.72c.55 0 1-.45 1-1 0-.555.476-1 .874-1zm-2.53 6h35.687l-5.032 34.375C37.599 47.379 36.922 48 36 48H14c-.922 0-1.684-.621-1.813-1.531zm5.093 4.281c-.266.04-.508.184-.664.399-.16.218-.223.492-.18.758l3.313 24.906a1 1 0 101.969-.281l-3.282-24.907a1.01 1.01 0 00-.39-.687 1.012 1.012 0 00-.766-.188zm8.406 0a.999.999 0 00-.843 1.063l1.093 24.906c.028.55.496.98 1.047.953.55-.027.98-.496.953-1.047L21.813 17.25a1.01 1.01 0 00-.325-.71 1.027 1.027 0 00-.738-.259h-.094zm8.375 0a.996.996 0 00-.843.969l-1.094 24.906c-.028.551.402 1.02.953 1.047.55.027 1.02-.402 1.047-.953l1.093-24.906a1.007 1.007 0 00-.289-.774 1.008 1.008 0 00-.773-.289h-.094zm8.407 0a.999.999 0 00-.844.875l-3.282 24.907a1 1 0 101.969.281l3.313-24.907a.998.998 0 00-1.063-1.156h-.093z"
              ></path>
            </svg>
          </div>
        
       {loader ?
        <div
        className="position-relative"
        >
          <Loader />
          </div>
          :
          <div>
            <NoteCard
              setNotes={setNotes}
              notes={notes}
              setValueEdited={setValueEdited}
              valueEdited={valueEdited}
              setOpenModal={setOpenModal}
              filteredNotes={filteredNotes}
              screen={screen}
              theme={theme}
              setLoader={setLoader}
            />
          </div>
}
        </div>
      </div>
    </div>
  );
}

export default Main;
