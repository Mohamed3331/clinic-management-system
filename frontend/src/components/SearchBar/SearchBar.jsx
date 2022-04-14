import React from "react";
import { filterPatients } from "../../redux/filteredPatientsSlice";
import { useDispatch } from "react-redux";
import "./SearchBar.css";

export default function SearchBar() {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(filterPatients(e.target.value));
    }
  };

  const dispatch = useDispatch();

  return (
    <section className="searchbar_container">
      <input
        onKeyDown={handleKeyDown}
        className="searchbar"
        type="text"
        placeholder="Search & Enter"
      />
      <div className="searchbar_text">اسم المريض</div>
    </section>
  );
}
