import React from "react";
import { filterPatients } from "../../redux/filteredPatientsSlice";
import { useDispatch } from "react-redux";
import "./SearchBar.css";

export default function SearchBar() {
  const onChangeHandler = (e) => {
    dispatch(filterPatients(e.target.value));
  };

  const dispatch = useDispatch();

  return (
    <section className="searchbar_container">
      <input onChange={onChangeHandler} className="searchbar" type="text" />
      <div className="searchbar_text">اسم المريض</div>
    </section>
  );
}
