import React from 'react';
import styles from './cards.module.css';
import { Card } from './card';

export class Cards extends React.Component {
    renderCards = () => {
        const { cards = [], path, rounded, hideDetails, detailsSelector, detailsPath } = this.props;
        return cards.map((card) => 
            <Card
                key={card.id}
                hideDetails={hideDetails}
                path={path}
                rounded={rounded}
                detailsSelector={detailsSelector}
                detailsPath={detailsPath}
                {...card}  
            />
        )
    }
    render() {
        return (
            <div className={styles.container}>
                {this.renderCards()}
            </div>
        )
    }
}