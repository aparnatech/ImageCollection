import React, { Component } from 'react';
import './gallery.css';
const axios = require('axios');
const moment = require('moment');
var searched1;

export default class Gallery extends Component {
  constructor() {
    super();
    this.iterateImage = this.iterateImage.bind(this);
    this.onsearchhandleChange = this.onsearchhandleChange.bind(this);
    this.RandomizeFun = this.RandomizeFun.bind(this);
    this.DateFilter = this.DateFilter.bind(this);
    this.Description =  this.Descriiption.bind(this);
    // this.date = this.date.bind(this);
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
  DateFilter() {
    // 
    if (moment(this.state.search, "DD/MM/YYYY", true).isValid()) {
      var initial = this.state.search.split(/\//).reverse().join('-');
      console.log(initial);
      searched1 =  this.state.datas.filter(img => {
          var date1 = new Date(img.date);
          return date1.toISOString().substring(0, 10) === initial;
        });
        console.log('date@@@@@@@@', searched1);
        // this.setState({
        //   datas: [...searched1]
        // });
        console.log('st*******', this.state.datas);
  }
}
  Descriiption() {
    if((/^[a-zA-Z]+$/.test(this.state.search))) {
      console.log('oo',this.state.search);
       const searched  =  this.state.datas.filter(img => {
        return img.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      })
      console.log('searched', searched);
  }
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
  // date(formateDate){
  //   return new Date(formateDate);
  // }
  render() {
    if(this.state.datas.length) {
      var imageFilter;
      const {search} = this.state;
      console.log(search,'render');
      // const imageFilter12 = searched ;
     imageFilter = this.state.datas.filter(img => {
        if(img.description) {
          return img.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
        // }     if(moment(this.state.search, "DD/MM/YYYY", true).isValid()) {
        //   imageFilter = searched1
          // this.state.datas.filter(img => {
          //   var initial = this.state.search.split(/\//).reverse().join('-');
          //   var date1 = new Date(img.date);
          //   return date1.toISOString().substring(0, 10) === initial;
          // });
        }
     
    })
      return (
        <div className="container">
           <input type="text" className="inputdesign"  onBlur={this.onsearchhandleChange}  placeholder="Search Image with description..." />
           <button className="btn button_style" onClick={this.RandomizeFun}>List images</button>
           <button className="btn button_style" onClick={this.DateFilter}>Date</button>
           <button className="btn button_style" onClick={this.Description}>Description</button>
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
