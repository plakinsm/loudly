import React from 'react';
import { connect } from 'react-redux';
import styles from './home.module.css';
import { playerActionCreators } from '../../store/player';
import { bindActionCreators } from 'redux';
import { Songlist } from '../../components/songlist';
import { Container } from '../../components/container/container';
import { recommendationsActionCreators } from '../../store/recommendations';
import { fetchForRecommendations } from '../../api/fetch';

class HomeCpm extends React.Component {
    componentDidMount() {
        this.props.dispatch(
            fetchForRecommendations((recomendations) => this.props.putRecommendations(recomendations.data))
        );
    }
    render() {
        return (
            <Container namespace="home">
                <div className={styles.container}>
                    <h1 className={styles.header}>For you</h1>
                    <Songlist songs={this.props.recommendations} {...this.props} />
                </div>
            </Container>
        )
    }
}

export const Home = connect(
    (state) => ({
        ...state.player,
        ...state.recommendations,
    }),
    (dispatch) => ({
        ...bindActionCreators({
            ...playerActionCreators,
            ...recommendationsActionCreators
        }, dispatch),
        dispatch
    })
)(HomeCpm)