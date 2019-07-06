import React, { Component } from 'react';
import './gallery.css';
const axios = require('axios');
export default class Gallery extends Component {
  constructor() {
    super();
    this.iterateImage = this.iterateImage.bind(this);
    this.onsearchhandleChange = this.onsearchhandleChange.bind(this);
    this.RandomizeFun = this.RandomizeFun.bind(this);
    this.state = {
      datas: [],
      search: '',
      loading: false
    };
  }
  componentDidMount() {
    axios.get('http://localhost:5000/upload/')
    .then(res=> {
      const data = res.data
      this.setState({
        datas: data,
        loading: true
      })
    }).catch(error => { console.log('request failed', error); });
  }
  iterateImage(img) {
    return (
      img.map((src,index)=> {
        return (
          <div className="imag_div" key={index}>
             <img src={src} alt=""/>
          </div>
        )
      })
    )
  }
  onsearchhandleChange(e) {
      this.setState({
        search: e.target.value
      })
  }
  RandomizeFun() {
    let ShuffleData = this.state.datas.sort(() => {
      return .5 - Math.random();
    });
    this.setState({
      datas : [...ShuffleData]
    })    
  }
  render() {
    if(this.state.datas.length) {
      const {search} = this.state;
      const imageFilter = this.state.datas.filter(img => {
      return img.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
      return (
        <div className="container">
           <input type="text" className="inputdesign"  onChange={this.onsearchhandleChange}  placeholder="Search Image with description..." />
           <button className="btn button_style" onClick={this.RandomizeFun}>Randomize</button>
             { imageFilter.map((link) => {
                return(
                  <div className="whole_div" key={link._id}>
                  <div className="writer">{link.description}({link.image.length})</div>
                  <hr/>
                    {this.iterateImage(link.image)}
                  </div>
                ) 
          })}
        </div> 
      );
    } else if(this.state.datas.length === 0 && this.state.loading !== false) {
      return (
        <div className="box">
          Oops Gallery is empty...
     </div>
      );
    } else {
        return (
          <div className="box">
           <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>
          </div>
        );
    }
  }
}
