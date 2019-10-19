import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import {Route} from 'react-router-dom'

import './App.css'

import Splash from './pages/Splah'
import Login from './pages/Login'
import Description from './pages/Description'
import Home from './pages/Home'
import Store from './pages/Store'
import Disagree from './pages/Disagree'
import Calendars from './pages/Calendars'
import InstructModal from './components/Modal'

import questionMark from './resources/question_mark.png'


function getRandomType(){
  return Math.floor(Math.random() * 2) === 1 ? 'A' : 'B';
}

export default class App extends Component {

  constructor(props){
    super(props)
    this.state= {
      userId : "",
      screen : "",
      type : getRandomType(),
      end : false,
      instrument:"Please Read All Description And Check Agree Or Disagress",
      isInstalled: false,
      isOpenInstruction: false
    }

    this.handler = this.handler.bind(this)
    this.handleInstall = this.handleInstall.bind(this)
    this.handleInstruct = this.handleInstruct.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    console.log(this.state.type)
  }

  handler(someValue) {
    this.setState({
      screen: someValue
    })
    if (someValue === 'Description.') {
        if(this.state.end) this.setState({
            title: 'End.'
        })
        if(!this.state.first_try){
          this.setState({
              type : this.state.type === 'A' ? 'B' : 'A',
              end : true,
              isInstalled: false
          })
        }
        else{
            this.setState({
                first_try : false
            })
        }
    }
  }

  handleInstall = () => {
    this.setState({
      isInstalled: true
    })
  }

  handleUnInstall = () => {
    this.setState({
      isInstalled: false
    })
  }

  handleChangeType = () => {
    if(this.setState.type === 'A'){
      this.setState({type:'B'})
    }else{
      this.setState({type:'A'})
    }
    
  }

  handleOpen = () => {
    this.setState({
      isOpenInstruction: true
    })
  }

  handleClose = () => {
    this.setState({
      isOpenInstruction: false
    })

    console.log(this.state.isOpenInstruction)
  }

  handleInstruct = (value) => {
    console.log(value)
    this.setState({
      instrument: value
    })
  }

  render() {
    return (
      <div className='device_container'>
        <div className = "instruction">
          <button onClick={this.handleOpen}
          >
            <img src={questionMark} alt = "instruct"/>
          </button>
        </div>
        {this.state.isOpenInstruction? <InstructModal 
                                          isOpen={this.state.isOpenInstruction}
                                          handleOpen={this.handleOpen}
                                          handleClose={this.handleClose}
                                          //instruct={this.state.instrument}
                                          /> : ''}
        
        <Route  exact path = "/" 
                component = {()=><Description handleInstruct = {this.handleInstruct}/>}
        />
        <Route path = "/login" component = {Login}/>
        <Route  path = "/ios_backgroud" 
                component={()=><Home isInstalled={this.state.isInstalled} type = {this.state.type}/>}/>
        <Route  path = {`/app_store/:${this.state.type}`} 
                component={()=><Store handleInstall={this.handleInstall} 
                                      type = {this.state.type} 
                                      isInstalled = {this.state.isInstalled} 
                                />}/>
        <Route path = "/splash" component={Splash}/>
        <Route path = "/disagree" component={Disagree}/>
        <Route path = "/calendars" component={Calendars}/>
      </div>
    )
  }
}
