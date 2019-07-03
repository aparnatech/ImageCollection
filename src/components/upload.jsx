import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { Link } from "react-router-dom";
import './upload.css';
import axios from 'axios'

class upload extends Component {   
    constructor(props) {
        super(props);
        this.fileSelectedHandler =  this.fileSelectedHandler.bind(this);
        this.onChangedescription =  this.onChangedescription.bind(this);
        this.onSubmit =  this.onSubmit.bind(this);
        this.state = {
            image: '',
            description: ''
        }
    }
    fileSelectedHandler (files) {
        this.setState({
            image: files.base64
        })
    } 
    onChangedescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        if(this.state.image === ''){
           alert('Upload the image');
        }
        else {
            const detail = {
                image: this.state.image,
                description: this.state.description
            }
           
            axios.post('http://localhost:5000/upload/images', detail)
                .then(res => {
                    alert('image uploaded');
                   this.setState ({
                    image: '',
                    description: ''
                })
            });
        }
        
    }
    render() {
        return (
          <div className="center">
            <form onSubmit={this.onSubmit} method="post" className="form_class">
            <ReactFileReader handleFiles={this.fileSelectedHandler} base64={true} multipleFiles={true}>
            <button type="button" className='btn'>choose Image</button>
            </ReactFileReader>
            <br/>
            <input  type="text" placeholder="about the image..." value={this.state.description} className="uploading_input" onChange={this.onChangedescription} required />
            <div><button className="btn" type="submit">upload</button></div>
            
            </form>   
          </div>
        );
    }
}
export default upload;
