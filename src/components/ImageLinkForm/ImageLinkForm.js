import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
    return(
      <div>
        <p className='white f3'>
          {'Enter your image URL below and this app will detect faces. Give it a try!'}
        </p>
        <div className='center'>
          <div className='form center pa4 br3 shadow-5'>
            <input type ='text' className='f4 pa2 ma2 br-pill w-70 center' onChange={onInputChange}/>
            <button className='w-30 grow f4 link ph3 pv2 ma2 white br-pill bg-blue'
            onClick={onImageSubmit}>Detect</button>
          </div>
        </div>
      </div>
    );
}

export default ImageLinkForm;