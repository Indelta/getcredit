import React, {useState, useEffect} from 'react';
import SelectionItems from './selectionItems';
import './selection.scss';

const Selection = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    }, []);
    return (
        <section id="selection">
            <div className="container">
                { windowWidth >= 768 && <h2>Подбор кредита онлайн:</h2> }
                <SelectionItems />
            </div>
        </section>
    );
}

export default Selection;