import React from 'react';

class OpenQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({answer: event.target.value});
    }

    handleSubmit(event) {
        alert(this.state.answer);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Your Answer:
                    <textarea class="form-control-lg form-control" value={this.state.answer} onChange={this.handleChange} />
                </label>
                <input class="btn btn-primary btn-next btn-lg" type="submit" value="Submit" />
            </form>
        );
    }
}

export default OpenQuestion;