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
    this.DateFilter = this.DateFilter.bind(this);
    this.Description =  this.Description.bind(this);
    this.input = this.input.bind(this);
    this.update = this.update.bind(this);
    this.DeleteImageSingle = this.DeleteImageSingle.bind(this);

    this.state = {
      datas: [],
      search: '',
      loading: false,
      flag: true,
      value: ''
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axios.get('http://localhost:5000/upload/')
    .then(res=> {
      const data = res.data
      if (this._isMounted) {
      this.setState({
        datas: data,
        loading: true,
        flag: true,
      })
      }
    
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

input(link) {
  return (
    <input type="text" className="inputdesignModel" value={this.state.value} onChange={e => this.update(e,link)}  placeholder="Edit description here..." />
  )
}

openModal() {
  this.setState({
      visible : true
  });
}

update(event,data) {
  console.log('data', this.state.value);
    event.preventDefault();
    const search = event.target.value;
    if(search !== '') {
      const description = {
        description: search
      }
      console.log(description,'description');
      axios.post(`http://localhost:5000/upload/updating/${data._id}` , description)
      .then(res=> {
        console.log(res,'responce');
        this.componentDidMount();
        // alert('updated');

      }).catch(error => { console.log('request failed', error); });
    }
    this.setState({value: event.target.value});
  }

closeModal() {
  if (this._isMounted) {
    this.setState({
      visible : false,
      value:''
  });
  alert('updated');
  }
}

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

componentWillUnmount() {
  this._isMounted = false;
}

DateFilter(e) {
  e.preventDefault();
  this.setState({
    flag: false
  })
}
Description(e) {
  e.preventDefault();
    this.setState({
      flag: true
    })
  }

open(e,id) {
  e.preventDefault();
  this.setState({visible: true});
  this.update(e,id);
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
      // const {search} = this.state;
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
                    <div className="EditDeleteBtn">
                    <button className="btn button_style" type="submit" onClick={e => this.DeleteImageSingle(e, link._id)}>Delete</button>
                    <button className="btn button_style" type="submit" onClick={e => this.open(e, link._id)}>edit</button></div>
                  <div className="writer">{link.description}({link.image.length})</div>
                  
                  <hr/>
                    {this.iterateImage(link.image)}
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
