import React from 'react';
import { NavLink } from 'react-router-dom';
// import { NavLink } from '../../components';
import styles from './Navigation.module.css';
import { ReactComponent as HomeIcon} from '../../assets/home.svg';
import { ReactComponent as SearchIcon} from '../../assets/search.svg';
import { ReactComponent as LibraryIcon} from '../../assets/library.svg';

export const Navigation = () => (
    <ul className={styles.container}>
        <li>
            <NavLink to="/"
                className={styles.item}
                exact
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