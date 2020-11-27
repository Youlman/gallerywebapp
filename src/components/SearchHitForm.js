import React, {Component} from 'react';

class SearchHitForm extends Component {
    constructor(props) {
        super(props);
        this.state ={
            keywordValue: ''
        }
    }

    setKeyword = (event) => {
        this.setState({
            keywordValue: event.target.value
        })
    }

    doSearch = (event) => {
        event.preventDefault();
        this.props.search(this.state.keywordValue);
    }

    render() {
        return (
            <form onSubmit={this.doSearch}>
                <div className="row m-2 p-2">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.keywordValue}
                            onChange={this.setKeyword}
                            placeholder="Keyword"
                        />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success">Chercher</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default SearchHitForm;
