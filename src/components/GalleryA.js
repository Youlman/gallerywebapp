import React, {Component} from 'react';
import axios from 'axios';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hits: [],
            currentPage: 1,
            pageSize: 10,
            currentKeyword: 'Paris',
            totalPages: 1,
            pages: []
        }
    }

    componentDidMount() {
        this.getHits();
    }

    getHits() {
        let url = "https://pixabay.com/api/?key=15610772-945850b5d08aa384fde833931&q="
            +this.state.currentKeyword + "&page=" +this.state.currentPage + "&per_page=" + this.state.pageSize;
        axios.get(url).then((resp )=> {
            let totalP = (resp.data.totalHits%this.state.pageSize===0)?resp.data.totalHits/this.state.pageSize:
                1+resp.data.totalHits/this.state.pageSize;
            this.setState({
                hits: resp.data.hits,
                totalPages: totalP,
                pages: new Array(totalP).fill(0)
            })
        }).catch((err)=> {
            console.log(err);
        })
    }

    setKeyword = (event) => {
        this.setState({
            currentKeyword: event.target.value
        })
    }

    onSearch = (event) => {
        event.preventDefault();
        this.getHits();
    }

    gotoPage= (page) => {
        this.setState({
            currentPage: page
        }, ()=>{
            this.getHits();
        });
    }

    render() {
        return (
            <div>
                <div>
                    <ul className="nav nav-pills">
                        {
                            this.state.pages.map((v, index) =>
                                <li key={index}>
                                    <button className={this.state.currentPage===index+1? "btn btn-primary": "btn btn-link"} onClick={() => this.gotoPage(index+1)}>{index +1 }</button>
                                </li>
                            )
                        }
                    </ul>
                </div>

                <form onSubmit={this.onSearch}>
                    <div className="row m-2 p-2">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.currentKeyword}
                                onChange={this.setKeyword}
                                placeholder="Keyword"
                            />
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-success">Chercher</button>
                        </div>
                    </div>
                </form>
                <div className="row">
                    {

                        this.state.hits.map((hit, index) =>
                            <div className="col-md-4" key={index}>
                                <div className="card">
                                    <div className="card-header">{hit.tags} | {hit.webformatWidth} x {hit.webformatHeight}</div>
                                    <div className="card-body">
                                        <img className="card-img" height={200} src={hit.webformatURL} alt=""/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Gallery;
