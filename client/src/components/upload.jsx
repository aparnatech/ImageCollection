import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import './upload.css';
import axios from 'axios'

class upload extends Component {   
    constructor(props) {
        super(props);
        this.fileSelectedHandler =  this.fileSelectedHandler.bind(this);
        this.onChangedescription =  this.onChangedescription.bind(this);
        this.cleartheImage = this.cleartheImage.bind(this);
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
        alert('upload clicked');
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
    
     cleartheImage() {
        if(this.state.image === '') {
            alert('No image to Unselect');
        } else {
            this.setState({image: ''});
            alert('successfully Unselected the image')
        }
    }
    
    render() {
        return (
          <div className="center">
            <form onSubmit={this.onSubmit} method="post" className="form_class">
            <ReactFileReader handleFiles={this.fileSelectedHandler} base64={true} multipleFiles={true}>
            <button type="button" className='btn'>choose Image</button>
            </ReactFileReader>
            <button className="btn unselect_style" type="button" onClick={this.cleartheImage}>unselect Image</button>
            <br/>
            <input  type="text" placeholder="about the image..." value={this.state.description} className="uploading_input" onChange={this.onChangedescription} required />
            <div><button className="waves-effect waves-light btn-small" type="submit"><i className="material-icons left">cloud</i>upload</button></div>  
            </form>   
          </div>
        );
    }
}

export default upload;
