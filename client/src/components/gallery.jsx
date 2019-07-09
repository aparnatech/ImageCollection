import React, { Component } from 'react';
import './gallery.css';
const axios = require('axios');
// const moment = require('moment');

export default class Gallery extends Component {
  constructor() {
    super();
    this.iterateImage = this.iterateImage.bind(this);
    this.onsearchhandleChange = this.onsearchhandleChange.bind(this);
    this.RandomizeFun = this.RandomizeFun.bind(this);
    this.DateFilter = this.DateFilter.bind(this);
    this.Description =  this.Description.bind(this);
    this.state = {
      datas: [],
      search: '',
      loading: false,
      flag: true,
    };
  }
  componentDidMount() {
    axios.get('http://localhost:5000/upload/')
    .then(res=> {
      const data = res.data
      this.setState({
        datas: data,
        loading: true,
        flag: true,
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
  DateFilter(e) {
    e.preventDefault();
    this.setState({
      flag: false
    })
    // if (moment(this.state.search, "DD/MM/YYYY", true).isValid()) {
    //   var initial = this.state.search.split(/\//).reverse().join('-');
    //   console.log(initial);
    //   searched1 =  this.state.datas.filter(img => {
    //       var date1 = new Date(img.date);
    //       return date1.toISOString().substring(0, 10) === initial;
    //     });
    //     console.log('date@@@@@@@@', searched1);
    //     // this.setState({
    //     //   datas: [...searched1]
    //     }
    //     console.log('st*******', this.state.datas);
  
}
  Description(e) {
    e.preventDefault();
    this.setState({
      flag: true
    })
}
  onsearchhandleChange(e) {
    e.preventDefault();
      this.setState({
        search: e.target.value
      })
  }
  RandomizeFun() {
    let ShuffleData = this.state.datas.sort(() => {
      return .5 - Math.random();
    });
    this.setState({
      datas : [...ShuffleData],
      flag: true
    })    
  }
  render() {
    if(this.state.datas.length) {
      var imageFilter;
      const {search} = this.state;
    console.log('this.state.flag', this.state.flag);
      if(this.state.flag === false) {
        var initial = this.state.search.split(/\//).reverse().join('-');
        const searched1 =  this.state.datas.filter(img => {
            var date1 = new Date(img.date);
            console.log(date1.toISOString().substring(0, 10) === initial);
            return date1.toISOString().substring(0, 10) === initial;
        });
          imageFilter = [...searched1]
      } if(this.state.flag !== false) {
        const searched  =  this.state.datas.filter(img => {
          return img.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        imageFilter = [...searched]
      }
      return (
        <div className="container">
           <input type="text" className="inputdesign"  onBlur={this.onsearchhandleChange}  placeholder="Search Image with description..." />
           <button className="btn button_style" onClick={e=>this.RandomizeFun(e)}>List images</button>
           <button className="btn button_style" onClick={e=>this.DateFilter(e)}>Date</button>
           <button className="btn button_style" onClick={e=>this.Description(e)}>Description</button>
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
