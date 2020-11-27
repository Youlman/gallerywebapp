import React, {Component} from 'react';
import axios from "axios";
import HitItem from "./HitItem";

class HitDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hit:null
        }
    }

    getHit(id) {
        let url = "https://pixabay.com/api/?key=15610772-945850b5d08aa384fde833931&id="+id;
        axios.get(url).then((resp )=> {
            this.setState({
                hit: resp.data.hits[0]
            })
        }).catch((err)=> {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getHit(this.props.match.params.id);
    }

    render() {
        if (this.state.hit!=null){
            return (
                <HitItem hit = {this.state.hit} details = {true}/>
            );
        }else{
            return <div></div>
        }

    }
}

export default HitDetails;
