import React from 'react';
import styles from "./SearchBar.module.css"
const SearchBarAdmin = ({onSearch}) => {
    return (
        <div>
            <input onChange={onSearch} className={styles.SearchAdmin} type="text" placeholder="chercher..." />
        </div>
    );
};

export default SearchBarAdmin;