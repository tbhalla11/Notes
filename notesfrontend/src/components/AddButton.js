import React, {useState, useEffect} from "react";
import ListItem from "../components/ListItem";
import {Link} from "react-router-dom";
import {ReactComponent as plus} from "../assets/plus.png";



const AddButton = () => {

    return (
        <Link to="/note/new" className="floating-button">
            <plus/>
        </Link>
    )
}

export default AddButton;