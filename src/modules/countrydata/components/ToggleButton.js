import React from "react";


class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { buttonState: true};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            buttonState: !this.state.buttonState
        });

        if (this.props.customEvent !== undefined) {
            this.props.customEvent(this.state.buttonState);
        }
    }

    render() {
        return (
            <div>
                <label>Data</label>
                <div className="switch">
                    <label>
                        <input type="checkbox" onChange={this.handleClick} />
                        <span className="slider round" />
                    </label>
                </div>
                <label>Charts</label>
            </div>
        );
    }
}

export default ToggleButton;
