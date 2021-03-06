import React from 'react';
import { NavLink } from 'react-router-dom';
// import { NavLink } from '../../components';
import styles from './navigation.module.css';
import { ReactComponent as HomeIcon} from '../../assets/home.svg';
import { ReactComponent as SearchIcon} from '../../assets/search.svg';
import { ReactComponent as LibraryIcon} from '../../assets/library.svg';

export const Navigation = () => (
    <ul className={styles.container}>
        <li>
            <NavLink to="/home"
                className={styles.item}
                activeClassName={styles.itemActive}
            >
                <HomeIcon />
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/search"
                className={styles.item}
                activeClassName={styles.itemActive}
            >
                <SearchIcon />
                Search
            </NavLink>
        </li>
        <li>
            <NavLink to="/library"
                className={styles.item}
                activeClassName={styles.itemActive}
            >
                <LibraryIcon />
                Library
            </NavLink>
        </li>
    </ul>
)