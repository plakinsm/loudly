import React from 'react';
import styles from './search.module.css';
import { Container } from '../../components/container/container';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playerActionCreators } from '../../store/player';
import { searchFetch } from '../../api/search';
import { searchActionCreators } from '../../store/search';
import { Songlist } from '../../components/songlist';
import { Cards } from '../../components/cards/cards';

class SearchCmp extends React.Component {
    state = {
        query: '' 
    }

    putNextResult = true;

    onSearchChange = (e) => {
        const { value } = e.target;
        const { dispatch, putSearchResults, clearSearch } = this.props;
        this.setState({ query: value })
        if (value) {
            this.putNextResult = true;
            dispatch(searchFetch(value, (result) => {
                if (this.putNextResult) {
                    putSearchResults(result.data);
                }
            }))
        } else {
            this.putNextResult = false;
            clearSearch();
        }
    }

    componentWillUnmount = () => {
        this.props.clearSearch();
    }

    render() {
        const {
            results: {
                songs,
                artists,
                albums
            }
        } = this.props;

        const showSongs = !!(songs && songs.length);
        const showArtists = !!(artists && artists.length);
        const showAlbums = !!(albums && albums.length);
        const noResults = this.state.query && !showSongs && !showArtists && !showAlbums;
        return (
            <div className={styles.container}>
                <div className={styles.searcherContainer}>
                    <input
                        type="text"
                        placeholder="Let's find something"
                        className={styles.searcher}
                        value={this.state.query}
                        onChange={this.onSearchChange}
                    />
                </div>
                <Container namespace="search">
                    <div>
                        {showSongs && (
                            <div className={styles.block}>
                                <h2 className={styles.h2}>Songs</h2>
                                <Songlist songs={songs} {...this.props} />
                            </div>
                        )}
                        {showArtists && (
                            <div className={styles.block}>
                                <h2 className={styles.h2}>Artist</h2>
                                <Cards cards={artists} rounded path="/artist/" hideDetails />
                            </div>
                        )}
                        {showAlbums && (
                            <div className={styles.block}>
                                <h2 className={styles.h2}>Albums</h2>
                                <Cards
                                    cards={albums}
                                    path="/album/"
                                    detailsPath="/artist/"
                                    detailsSelector="artist"
                                />
                            </div>
                        )}
                        {noResults && (
                            <div className={styles.block}>
                                <h1>No results</h1>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        )
    }
}

export const Search = connect(
    (state) => ({
        ...state.player,
        ...state.search,
    }),
    (dispatch) => ({
        ...bindActionCreators({
            ...playerActionCreators,
            ...searchActionCreators
        }, dispatch),
        dispatch
    })
)(SearchCmp)