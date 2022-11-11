import Button from "./UI/Button";
import './Search.scss'
import { useState, useRef } from "react";

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('')
    const searchRef = useRef()

    const clearSearchHandler = (e) => {
        e.preventDefault();
        setSearchValue('')
    }

    const searchChangeHandler = () => {
        setSearchValue(searchRef.current.value)
    }

    const keyUpHandler = async () => {
        if(searchValue.trim() !== '') {
            props.setSearch(true)
            await props.onSearch(searchValue)
            
        } else {
            props.setSearch(false)
            props.onSearch(searchValue)
        }
    }

    const searchSubmitHandler = async e => {
        e.preventDefault();
    }
    
    
    return ( 
        <form className="search-block" onSubmit={searchSubmitHandler}>
            <label className="search-title" htmlFor="search">Search tasks</label>
            <Button classes='clear-btn' onClick={clearSearchHandler}>Clear</Button>
            <input value={searchValue} type="text" name="search" id="search" ref={searchRef} onChange={searchChangeHandler} onKeyUp={keyUpHandler}/>
            <Button classes="search-btn">Search</Button>
        </form>
     );
}

export default Search;