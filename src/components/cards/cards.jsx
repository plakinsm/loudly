import React from 'react';
import styles from './cards.module.css';
import { Card } from './card';

export class Cards extends React.Component {
    renderCards = () => {
        const { cards = [] } = this.props;
        return cards.map((card) => 
            <Card
                key={card.id}
                hideDetails
                path="/album/"
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