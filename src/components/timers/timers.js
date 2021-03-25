import React, { Component } from "react";
import './timers.css'

const Timer = ({ seconds }) => {
  return <div className='Timer'>Секунды: {seconds}</div>;
}

export default Timer