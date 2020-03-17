import React, {useState} from 'react';
import EditorJS from 'react-editor-js';
import axios from 'axios';
import { editorTools } from '../editorTools';
import { editorParserJson } from '../editorParserJson';
import { connect } from 'react-redux';
import { updatePosts } from '../../actions/postsAction';

function AdminPostsCreacte (props) {
    const [editorInstance, setEditorInstance] = useState();
    const [archived, setArchived] = useState(true);
    const [published, setPublished] = useState(false);
    const [main, setMain] = useState(false);
    const [formTitle, setFormTitle] = useState("Получить консультацию");
    const [formSubtitle, setFormSubtitle] = useState("Заполните форму ниже и наш специалист свяжется с Вами в ближайшее время");
    const [btnName, setBtnName] = useState("Получить консультацию");
    const token = sessionStorage.getItem('gc-token') || localStorage.getItem('gc-token') || null;
    const saveHandler = () => {
        editorInstance.save()
            .then(val => {
                const days = new Date(val.time).getDate();
                const month = new Date(val.time).getMonth();
                const year = new Date(val.time).getFullYear();
                const savedDate = `${year}-${(month + 1) < 10 ? '0'+ (month + 1) : month + 1}-${days < 10 ? '0'+ days : days}`;
                const html = editorParserJson(val.blocks);
                const jsonString = JSON.stringify(val.blocks);
                const postData = {
                    savedDate, 
                    html, 
                    jsonString, 
                    archived, 
                    published, 
                    main,
                    formTitle,
                    formSubtitle,
                    btnName, 
                    editorData: JSON.stringify(val)
                };
                axios.post('/api/posts', postData, {headers: {Authorization: `Bearer ${token}`}})
                    .then(res => res.data)
                    .then(data => {
                        if (data.error) console.log(data.message);
                        else {
                            editorInstance.clear();
                            setArchived(false);
                            setPublished(false);
                            setMain(false);
                            props.updatePostsToStore(data);
                        };
                    })
                    .catch(err => console.error(err));
            });
        
    }
    
    return (
        <div className="posts-create">
            <EditorJS tools={editorTools} instanceRef={instance => setEditorInstance(instance)} />
            <div className="modificators">
                <label>
                    <input 
                        type="radio" 
                        name="where" 
                        onChange={
                            () => {
                                setArchived(!archived);
                                setPublished(!published);
                            }    
                        } 
                        checked={archived} />
                    <span>В архиве</span>
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="where" 
                        onChange={
                            () => {
                                setPublished(!published);
                                setArchived(!archived);
                            }    
                        } 
                        checked={published} />
                    <span>Опубликована</span>
                </label>
                <label>
                    <input type="checkbox" onChange={(e) => setMain(e.target.checked)} checked={main} />
                    <span>На главной странице</span>
                </label>
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
            </div>
            <button onClick={saveHandler} className="btn">Сохранить</button>
        </div>
    );
}

export default connect(
    state => ({store: state.postsReducer}),
    dispatch => ({
        updatePostsToStore: newPosts => dispatch(updatePosts(newPosts))
    })
)(AdminPostsCreacte);