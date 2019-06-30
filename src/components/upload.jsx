import React, { Component } from 'react';
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
    fileSelectedHandler (e) {
        this.setState({
            image: e.target.files[0]
        })
    } 
    onChangedescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const detail = {
            image: this.state.image,
            description: this.state.description
        }
        // const fd = new FormData();
        // fd.append('images', this.state.image);
        // fd.append('description', this.state.description);
       console.log(detail);
       axios.post('http://localhost:5000/upload/images', JSON.stringify(detail))
        .then(res => {
            console.log(res.data)
            this.setState ({
                image: '',
                description: ''
            })
        });
    }
    render() {
        return (
          <div className="App">
            <form onSubmit={this.onSubmit} method="post">
            <input type="file" onChange={this.fileSelectedHandler} required/>
            <input  type="text" value={this.state.description} className="form-control" onChange={this.onChangedescription} required />
            <button type="submit">upload</button>
            </form>
          </div>
        );
    }
}
export default upload;