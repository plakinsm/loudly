import React from 'react';
import styles from './cards.module.css';
import { Link } from 'react-router-dom';

export class Card extends React.PureComponent {
    render() {
        const {imageUrl, name, hideDetails, path, id} = this.props;
        return (
            <Link to={`${path}${id}`} className={styles.card}>
                <div className={styles.cardImageWrapper}>
                    <img className={styles.cardImage} loading="lazy" src={imageUrl} alt={name} />
                </div>
                <div className={hideDetails ? styles.infoWithoutDetails : styles.info}>
                    <h3 className={styles.title}>{name}</h3>
                    {!hideDetails && (
                        <span>{}</span>
                    )}
                </div>
            </Link>
        )
    }
}