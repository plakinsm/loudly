import React from 'react';
import styles from './container.module.css';
import { isFetchingSelector } from '../../store/fetchable';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

const ContainerCpm = ({ children, fetching }) => (
    <div className={styles.container}>
        {fetching && (
            <div className={styles.loader}>
                <Loader type="Audio" color="#fff" height={80} width={80} />
            </div>
        )}
        {children}
    </div>
)

export const Container = connect(
    (state, props) => ({
        fetching: isFetchingSelector(props.namespace)(state)
    })
)(ContainerCpm);