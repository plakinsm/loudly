import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './library.module.css';
import { Songlist } from '../../components/songlist';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playerActionCreators } from '../../store/player';
import { isFetchingSelector } from '../../store/fetchable';
import { libraryActionCreators } from '../../store/library';
import { fetchForLibrary } from '../../api/fetch';
import { Container } from '../../components/container/container';

class LibraryCmp extends React.Component {
    componentDidMount() {
        this.props.dispatch(
            fetchForLibrary((result) => this.props.putSongsToLibrary(result.data.library))
        )
    }
    render() {
        console.log(this.props);
        return (
            <Container namespace="library">
                <div className={styles.container}>
                    <h1 className={styles.header}>Your Library</h1>
                    <Songlist {...this.props} />
                </div>
            </Container>
        )
    }
}

export const Library = connect(
    (state) => ({
        ...state.player,
        ...state.library,
        fetching: isFetchingSelector('library')(state)
    }),
    (dispatch) => ({
        ...bindActionCreators({
            ...playerActionCreators,
            ...libraryActionCreators
        }, dispatch),
        dispatch
    })
)(LibraryCmp)