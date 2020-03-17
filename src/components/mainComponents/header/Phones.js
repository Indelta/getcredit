import React, {useState, useEffect} from 'react';
import Phone from '../Phone';
import ConsultationLink from '../ConsultationLink';

const Phones = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const updateWidth = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', updateWidth, false);
        return () => window.removeEventListener('resize', updateWidth, false);
    });
    return (
        <div className="phones">
            <Phone />
            { windowWidth < 768 && <ConsultationLink /> }
        </div>
    );
}

export default Phones;