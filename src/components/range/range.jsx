import React from 'react';
import styles from './range.module.css';

export class Range extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.range = React.createRef();
        this.state = {
            active: false,
            mouseDown: false
        }
    }

    componentDidMount = () => {
        window.addEventListener('mouseup', this.onMouseUp);
        this.setValue(+this.props.value);
    }

    componentDidUpdate = () => {
        if (!this.state.mouseDown && this.props.value !== this.value) {
            this.setValue(this.props.value);
        } 
    }

    componentWillUnmount = () => {
        window.removeEventListener('mouseup', this.onMouseUp);
    }

    onMouseEnter = () => {
        if (!this.state.active) {
            this.setState({ active: true });   
        }
    }

    onMouseLeave = () => {
        if (this.state.active) {
            this.setState({ active: false });   
        }
    }

    setValue = (value) => {
        this.value = value;
        this.range.current.style.width = `${this.value * 100}%`;
    }

    onMouseMove = (event) => {
        const { left, width } = this.container.current.getBoundingClientRect();
        const { clientX } = event;
        let pos = clientX - left;
        if (pos < 0) {
            pos = 0;
        } else if (pos > width) {
            pos = width;
        }

        this.setValue(+((pos / width).toFixed(3)));
    }

    onMouseDown = () => {
        if (!this.state.mouseDown) {
            this.setState({ mouseDown: true });
            window.addEventListener('mousemove', this.onMouseMove);
        }
    }

    onMouseUp = () => {
        if (this.state.mouseDown) {
            this.props.onChange(this.value);
            this.setState({ mouseDown: false });
            window.removeEventListener('mousemove', this.onMouseMove);
        }
    }

    onClick = (event) => {
        if (!this.state.mouseDown) {
            this.onMouseMove(event);
            this.props.onChange(this.value);
        }
    }

    render() {
        const { active, mouseDown } = this.state;
        return (
            <div
                ref={this.container}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.onClick}
                className={active || mouseDown ? styles.containerActive : styles.container}
            >
                <div ref={this.range} className={styles.range}>
                    <div
                        className={styles.rangeButton}
                        onMouseDown={this.onMouseDown}
                    ></div>
                </div>
            </div>
        )
    }
}