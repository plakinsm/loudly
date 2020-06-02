import React from 'react';
import { get } from 'lodash';
import styles from './cards.module.css';
import { Link } from 'react-router-dom';
import { getUrl } from '../../api/urls';

export class Card extends React.PureComponent {
    render() {
        
        const {imageUrl, name, hideDetails, path, id, rounded, detailsPath, detailsSelector} = this.props;
        const details = get(this.props, detailsSelector, {});
        return (
            <Link to={`${path}${id}`} className={styles.card}>
                <div className={styles.cardImageWrapper}>
                    <img className={rounded ? styles.cardImageRounded : styles.cardImage} loading="lazy" src={getUrl(imageUrl)} alt={name} />
                </div>
                <div className={hideDetails ? styles.infoWithoutDetails : styles.info}>
                    <h3 className={styles.title}>{name}</h3>
                    {!hideDetails && (
                        <Link to={`${detailsPath}${details.id}`} className={styles.details} >{details.name}</Link>
                    )}
                </div>
            </Link>
        )
    }
}