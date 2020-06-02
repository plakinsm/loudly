import React from 'react';
import styles from './library.module.css';
import { Songlist } from '../../components/songlist';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playerActionCreators } from '../../store/player';
import { libraryActionCreators } from '../../store/library';
import { Container } from '../../components/container/container';
import { Link } from 'react-router-dom';

class LibraryCmp extends React.Component {
    render() {
        const { songs } = this.props;
        const renderEmpty = songs && !songs.length;
        return (
            <Container namespace="library">
                <div className={styles.container}>
                    <h1 className={styles.header}>Your Library</h1>
                    <Songlist {...this.props} />
                    {renderEmpty && (
                        <div className={styles.empty}>
                            <h2 className={styles.h2}>For now it's empty here.</h2>
                            <Link className={styles.linkToMain} to="/home">Let's find some good music!</Link>
                        </div>
                    )}
                </div>
            </Container>
        )
    }
}

export const Library = connect(
    (state) => ({
        ...state.player,
        ...state.library,
    }),
    (dispatch) => ({
        ...bindActionCreators({
            ...playerActionCreators,
            ...libraryActionCreators
        }, dispatch),
        dispatch
    })
)(LibraryCmp)