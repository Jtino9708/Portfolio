import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const cookies = new Cookies();


class activeMail extends Component {
    constructor(props){
        super(props);
        if(cookies.get('token')){
            window.location = "/homePage";
        }
    }
    
    async componentDidMount(){
        let resalt = await axios.get(`http://127.0.0.1:8000/api/activeMail/${this.props.match.params.mail}`)
            .catch((error) => alert('信箱已認證'));
    }
    


    render() { 
        return (
            <div className='backgroundAnimation2 width100'>
            <div className='row mx-0' style={{marginTop:'200px'}}>
            <div className='col'></div>
                    <div className='col-6 align-self-center bg-info text-center'>
                        <h2 className='text-light my-5'>已完成信箱認證請返回登入頁面</h2>
                        <a className="btn btn-success mb-5" href="http://127.0.0.1:3000/login">登入頁面</a>
                    </div>
                    <div className='col'></div>
            </div>
        </div>
        );
    }
}
 
export default activeMail;