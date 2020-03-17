import React from 'react';
import SitebarPost from './SitebarPost';
import Banner from '../mainComponents/Banner';

const Sitebar = props => {
    return (
        <aside className="sitebar">
            <h3 className="sitebar-title">Другие статьи</h3>
            {
                props.posts.map((item, index) => {
                    return index < props.count && <SitebarPost key={index} post={item} />
                })
            }
            <Banner />
        </aside>
    );
}

export default Sitebar;