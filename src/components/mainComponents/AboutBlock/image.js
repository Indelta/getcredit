import React from 'react';
import image from '../../../images/photo.jpg';

const Image = () => {
    return (
        <div className="image">
            <img src={image} alt="Our working office" />
        </div>
    );
}

export default Image;