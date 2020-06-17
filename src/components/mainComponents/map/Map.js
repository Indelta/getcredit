import React from 'react';
import './map.scss';

const MapSection = (props) => {
    
    return (
        <section id="map">
            {!props.withoutHeader && <h2>Как нас найти?</h2>}
            <div id="google-map">
                {
                    +props.activeMap === 0 ?
                        <iframe defer src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.369195760449!2d27.482459115408894!3d53.90741504023794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbc57dbc1f74c5%3A0x4a8bf122ad24b61d!2z0JXQtNC40L3Ri9C5INC60YDQtdC00LjRgtC90YvQuSDRhtC10L3RgtGAIEdldENyZWRpdC5ieQ!5e0!3m2!1sru!2sby!4v1575290496172!5m2!1sru!2sby" width="100%" height="320" frameBorder="0" style={{border: 0}} allowFullScreen="" title="google-map"></iframe> :
                    +props.activeMap === 1 ? 
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.5754432192143!2d30.332209715522666!3d53.90374964051428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d051e6e8879b55%3A0x1cc95273b8be0276!2z0YPQu9C40YbQsCDQlNC30LXRgNC20LjQvdGB0LrQvtCz0L4gMTFhLCDQnNC-0LPQuNC70ZHQsiAyMTIwMzA!5e0!3m2!1sru!2sby!4v1581687959757!5m2!1sru!2sby" width="100%" height="320" style={{border:0}} allowFullScreen="" title="google-map-mogilev"></iframe> : 
                    +props.activeMap === 2 ?
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.469765011364!2d30.997914715377664!3d52.4344045503222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d469a909751669%3A0xe65811e4d576482a!2z0YPQuy4g0JLQtdGC0LrQvtCy0YHQutCw0Y8gMSwg0JPQvtC80LXQu9GM!5e0!3m2!1sru!2sby!4v1591957455910!5m2!1sru!2sby" width="100%" height="320" style={{border:0}} allowFullScreen="" title="google-map-gomel">></iframe> : null
                }
            </div>
        </section>
    );
}

export default MapSection;
