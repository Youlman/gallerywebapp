import React, {Component} from 'react';
import axios from 'axios';
import HitItem from "./HitItem";
import SearchHitForm from "./SearchHitForm";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hits: [],
            currentPage: 1,
            pageSize: 10,
            currentKeyword: '',
            totalPages: 1,
            pages: []
        }
    }

    componentDidMount() {
        //this.getHits();
    }

    getHits(keyword) {
        let url = "https://pixabay.com/api/?key=15610772-945850b5d08aa384fde833931&q="
            +keyword+ "&page=" +this.state.currentPage + "&per_page=" + this.state.pageSize;
        axios.get(url).then((resp )=> {
            let totalP = (resp.data.totalHits%this.state.pageSize===0)?resp.data.totalHits/this.state.pageSize:
                1+Math.floor(resp.data.totalHits/this.state.pageSize);
            this.setState({
                hits: resp.data.hits,
                totalPages: totalP,
                pages: new Array(totalP).fill(0),
                currentKeyword: keyword
            })
        }).catch((err)=> {
            console.log(err);
        })
    }

    onSearch = (keyword) => {
        this.setState({
            currentPage: 1,
            pages: []
        }, () =>{
            this.getHits(keyword)
        })
    }

    gotoPage= (page) => {
        this.setState({
            currentPage: page
        }, ()=>{
            this.getHits(this.state.currentKeyword);
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

                <SearchHitForm search = {this.onSearch} />

                <div className="row">
                    {

                        this.state.hits.map(hit =>
                            <HitItem key={hit.id} hit={hit} details={false} />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Gallery;
