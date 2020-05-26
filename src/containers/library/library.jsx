import React from 'react';
import styles from './library.module.css';
import { Songlist } from '../../components/songlist';
import { connect } from 'react-redux';
import { playerActionCreators } from '../../store/player';

const LibraryCmp = (props) => {
    console.log(props);
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Your Library</h1>
            <Songlist {...props} />
        </div>
    )
}

export const Library = connect((state) => ({
    ...state.player
}), {
    ...playerActionCreators
})(LibraryCmp)