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
    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const deleteButton = useSelector(state => state.i18n.buttons.deleteButton);

    // TODO при удалении поста непосредственно из самой истории перенаправлять на страницу историй и делать гет

    const {id} = useParams();

    const {[activeLanguage]: {title, text} = {}} = story;
    const {date} = story;
    const formattedDate = date?.slice(0, 10);

    useEffect(() => {
        getRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStory(res)));
    }, []);

    const handleEdit = () => {
        getRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStory(res)))
            .then(() => dispatch(setEditMode(true)))
    }

    const handleDelete = () => {
        deleteRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(() => getRequest(`http://localhost:3001/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setStories(res))));
    }

    const updatePostLayout = () => (
        <TextEditor title={title} text={text} date={formattedDate}/>
    );

    const readPostLayout = () => (
        <div>
            <h1>{title}</h1>
            <Markup content={text}/>
            <p>{formattedDate}</p>
            <button onClick={handleEdit}>{editButton}</button>
            <button onClick={handleDelete}>{deleteButton}</button>
        </div>
    )

    return (
        <>
            {isEditPostMode ? updatePostLayout() : readPostLayout()}
        </>
    )
}

export default Story;
