import React, { Component } from 'react';
import './gallery.css';
const axios = require('axios');
import Modal from 'react-awesome-modal';
export default class Gallery extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.iterateImage = this.iterateImage.bind(this);
    this.onsearchhandleChange = this.onsearchhandleChange.bind(this);
    this.RandomizeFun = this.RandomizeFun.bind(this);
    this.DeleteImageSingle = this.DeleteImageSingle.bind(this);
    this.input = this.input.bind(this);
    // this.DeleteImageSinglemul = this.DeleteImageSinglemul.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      datas: [],
      search: '',
      loading: false,
      value: ''
    };
  }
  componentDidMount() {
    this._isMounted = true;
    axios.get('http://localhost:5000/upload/')
    .then(res=> {
      const data = res.data
      if (this._isMounted) { this.setState({
        datas: data,
        loading: true
      }) }

     
    }).catch(error => { console.log('request failed', error); });
  }
  
  iterateImage(img) {
    return (
      img.map((src,index)=> {
        return (
          <div className="imag_div" key={index}>
             <img src={src} alt=""/>
             <button className="btn button_style" type="submit" onClick={e => this.DeleteImageSinglemul(e, img)}>Delete</button>
          </div>
        )
      })
    )
  }
  input(link) {
    return (
      <input type="text" className="inputdesignModel"  onChange={e => this.update(e,link)}  placeholder="Edit description here..." />
    )
  }
  open(e,id) {
    e.preventDefault();
    this.setState({visible: true});
    this.update(e,id);
  }
  update(event,data) {
    console.log('dddd', data)
    event.preventDefault();
    console.log('id',event.target.value );
    const search = event.target.value;
    
    // console.log('id88', id);
    if(event.target.value !== '') {
      const description = {
        description: search
      }
      
      console.log(this.state.datas,'poo');
      axios.post(`http://localhost:5000/upload/updating/${data._id}` , description)
      .then(res=> {
        console.log(res,'responce');
        this.componentDidMount();
        // alert('updated');

      }).catch(error => { console.log('request failed', error); });
    }

  }
  // DeleteImageSinglemul(event,src) { 
  //   console.log('event', event.target.value);
  //   console.log('eved', src);
  //   const l = this.state.datas.length;
  //   console.log('this.state.datas.length;', this.state.datas);
  //   const kl = [];
  //   // console.log(l);
  //   console.log();
  //   for(let i = 0; i < l; i++) {
  //     let childArray = this.state.datas[i].image;
  //     for(let j = 0; j < childArray.length; j++) {
  //       if(childArray[j] !== src) {
  //         console.log(childArray[j]);
  //         kl.push(childArray[j]);
  //       }
  //     }
  //   }
  //   console.log('data' , kl);
  //   console.log(this.state.datas,'after');
  // }
  DeleteImageSingle(event, id) {
    event.preventDefault();
    axios.delete(`http://localhost:5000/upload/delete/${id}`)
    .then(res=> {
      if (this._isMounted) {
        this.setState({
          datas: this.state.datas.filter(el=>el._id !== id)
        })
        alert('deleted');
      }
    }).catch(error => { console.log('request failed', error); });
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
  openModal() {
    this.setState({
        visible : true
    });
  }
  closeModal() {
    this.setState({
        visible : false
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
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
                    <button className="btn button_style" type="submit" onClick={e => this.DeleteImageSingle(e, link._id)}>Delete</button>
                    <div className="writer">{link.description}({link.image.length})</div>
                    <button className="btn button_style" type="submit" onClick={e => this.open(e, link._id)}>edit</button>
                    <hr/>{this.iterateImage(link.image)}
                    <Modal 
                    visible={this.state.visible}
                    width="400"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}>
                    <div>
                       <div className="edit">Edit here...</div>
                       <div className="centermodel"> {this.input(link)}</div>
                       <div className="centermodel"> <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a></div>
                    </div>
                </Modal>
                  </div>
                ) 
          })  }
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
