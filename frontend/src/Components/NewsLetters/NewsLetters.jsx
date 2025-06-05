import React from 'react';
import './NewsLetters.css';

const NewsLetters = () => {
  return (
    <div className='newsletters'>
      <h1>Get Exclusive Offers on Your Email</h1>
      <p>Subscribe to our newslette and stay updated</p>
      <div>
        <input type="email" placeholder='your Email id' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetters
