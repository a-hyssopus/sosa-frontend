import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Markup} from 'interweave';

import {setEditMode, setStories, setStory} from "../../store/ourStories/ourStories";
import TextEditor from "./TextEditor";
import {getRequest} from "../../utils/getRequest";
import {deleteRequest} from "../../utils/deleteRequest";

const Story = () => {
    const dispatch = useDispatch();
    const story = useSelector(state => state.ourStories.story);
    const isEditPostMode = useSelector(state => state.ourStories.isEditPostMode);
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const editButton = useSelector(state => state.i18n.editButton);
    const deleteButton = useSelector(state => state.i18n.deleteButton);

    const {id} = useParams();

    const {"image-src": src, date} = story;

    const {[activeLanguage]: { title, text } = {} } = story;

    const formattedDate = date?.slice(0, 10);

    const handleEdit = () => {
        getRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStory(res)))
            .then(() => dispatch(setEditMode(true)))
    }

    const handleDelete = () => {
        deleteRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then((res) => getRequest(`http://localhost:3001/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setStories(res))));
    }

    useEffect(() => {
        getRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStory(res)));
    }, []);

    return (
        <>
            {isEditPostMode ?
                (<div>
                    <TextEditor title={title} text={text} date={formattedDate}/>
                </div>) :
                (<div>
                    <h1>{title}</h1>
                    <img src={src} alt="Article Image"/>
                    <Markup content={text}/>
                    <p>{formattedDate}</p>
                    <button onClick={handleEdit}>{editButton}</button>
                    <button onClick={handleDelete}>{deleteButton}</button>
                </div>)
            }
        </>
    )
}

export default Story;
