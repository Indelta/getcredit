import React, { useState } from 'react';
import EditorJS from 'react-editor-js';
import { editorTools } from '../editorTools';
import { editorParserJson } from '../editorParserJson';
import axios from 'axios';
import { updatePosts } from '../../actions/postsAction';
import { connect } from 'react-redux';

function AdminReductPost (props) {
    const [editorInstance, setEditorInstance] = useState({});
    const postId = props.match.params.postId;
    const activePost = props.store.filter(item => item.id === parseInt(postId));
    const [formTitle, setFormTitle] = useState(-1);
    const [formSubtitle, setFormSubtitle] = useState(-1);
    const [btnName, setBtnName] = useState(-1);
    const postData = activePost[0] && JSON.parse(activePost[0].editorData);
    activePost[0] && formTitle === -1 && setFormTitle(activePost[0].formTitle);
    activePost[0] && formSubtitle === -1 && setFormSubtitle(activePost[0].formSubtitle);
    activePost[0] && btnName === -1 && setBtnName(activePost[0].btnName);

    let token = sessionStorage.getItem('gc-token') || localStorage.getItem('gc-token') || null;
    
    const saveHandler = () => {
        editorInstance.save()
            .then(val => {
                const days = new Date(val.time).getDate();
                const month = new Date(val.time).getMonth();
                const year = new Date(val.time).getFullYear();
                const savedDate = `${year}-${(month + 1) < 10 ? '0'+ (month + 1) : month + 1}-${days < 10 ? '0'+ days : days}`;
                const html = editorParserJson(val.blocks);
                const jsonString = JSON.stringify(val.blocks);
                const archived = activePost[0].isArchived;
                const published = activePost[0].isPublished;
                const main = activePost[0].isMain;
                const postData = {isReduct: true, postId, savedDate, html, jsonString, archived, published, main, formTitle, formSubtitle, btnName, editorData: JSON.stringify(val)};
                axios.put('/api/posts', postData, {headers: {Authorization: `Bearer ${token}`}})
                    .then(res => res.data)
                    .then(data => {
                        if (data.error) console.log(data.message);
                        else {
                            editorInstance.clear();
                            props.updatePostsData(data);
                        };
                    })
                    .catch(err => console.error(err));
            });
    }
    return (
        <div className="reduct-post">
            {
                postData && <EditorJS 
                tools={editorTools} 
                data={{...postData}} 
                instanceRef={instance => { setEditorInstance(instance)} } />
            }
            <label>
                <p>Название формы:</p>
                <input type="text" value={formTitle} onChange={e => setFormTitle(e.target.value)} />
            </label>
            <label>
                <p>Описание формы:</p>
                <input type="text" value={formSubtitle} onChange={e => setFormSubtitle(e.target.value)} />
            </label>
            <label>
                <p>Текст кнопки:</p>
                <input type="text" value={btnName} onChange={e => setBtnName(e.target.value)} />
            </label>
            <button className="btn" onClick={saveHandler}>Сохранить</button>    
        </div>
    );
}

export default connect(
    state => ({store: state.postsReducer}),
    dispatch => ({
        updatePostsData: newPosts => dispatch(updatePosts(newPosts))
    })
)(AdminReductPost);