// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isRunning: false,
    initialMin: 25,
    sec: 0,
    limit: 25,
    enableButton: true,
  }

  startTheTiming = () => {
    const {isRunning} = this.state
    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
      enableButton: false,
    }))
    if (!isRunning) {
      this.timerId = setInterval(this.time, 1000)
    } else {
      clearInterval(this.timerId)
    }
  }

  time = () => {
    const {initialMin, sec} = this.state
    if (sec === 0) {
      if (initialMin === 0) {
        clearInterval(this.timerId)
        return
      }
      this.setState(prevState => ({
        initialMin: prevState.initialMin - 1,
        sec: 59,
      }))
    } else {
      this.setState(prevState => ({sec: prevState.sec - 1}))
    }
  }

  onIncrement = () => {
    const {enableButton} = this.state
    if (enableButton) {
      this.setState(oldVal => ({
        initialMin: oldVal.limit + 1,
        limit: oldVal.limit + 1,
      }))
    }
  }

  onDecrement = () => {
    const {enableButton, initialMin} = this.state
    if (enableButton && initialMin > 0) {
      this.setState(oldVal => ({
        initialMin: oldVal.limit - 1,
        limit: oldVal.limit - 1,
      }))
    }
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      sec: 0,
      initialMin: 25,
      limit: 25,
      isRunning: false,
      enableButton: true,
    })
  }

  render() {
    const {isRunning, initialMin, sec, limit} = this.state
    const stringFideMin = initialMin > 9 ? initialMin : `0${initialMin}`
    const stringFideSec = sec > 9 ? sec : `0${sec}`
    const object = isRunning
      ? {
          imageUrl:
            'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
          altName: 'pause icon',
          condition: 'Pause',
          status: 'Running',
        }
      : {
          imageUrl:
            ' https://assets.ccbp.in/frontend/react-js/play-icon-img.png ',
          altName: 'reset icon',
          condition: 'Start',
          status: 'Paused',
        }
    return (
      <div className="bg-container">
        <h1 className="digital-heading">Digital Timer</h1>
        <div className="ove-all-container">
          <div className="time-container">
            <div className="round-container">
              <h1 className="min-sec">{`${stringFideMin}:${stringFideSec}`}</h1>
              <p className="run-pause">{object.status}</p>
            </div>
          </div>

          <div className="play-pause-set-over-all-container">
            <div className="button-container">
              <div className="play-pause-container">
                <button className="play-pause-button" type="button">
                  <img
                    onClick={this.startTheTiming}
                    className="play-pause-image"
                    alt="play icon"
                    src={object.imageUrl}
                  />
                </button>
                <p className="play-pause-text">{object.condition}</p>
              </div>

              <div className="play-pause-container">
                <button
                  onClick={this.onReset}
                  className="play-pause-button"
                  type="button"
                >
                  <img
                    className="play-pause-image"
                    alt={object.altName}
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  />
                </button>
                <p className="play-pause-text">Reset</p>
              </div>
            </div>

            <p className="set-timer-limit-para">Set Timer limit</p>
            <div className="limit-add-less-container">
              <button
                onClick={this.onDecrement}
                className="add-less-symbol"
                type="button"
              >
                -
              </button>
              <div className="limit-num-container">
                <p>{limit}</p>
              </div>
              <button
                onClick={this.onIncrement}
                className="add-less-symbol"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
