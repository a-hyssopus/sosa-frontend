import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Markup} from 'interweave';

import {setEditMode, setStories, setStory} from "../../store/ourStories/ourStories";
import TextEditor from "./TextEditor";
import {getRequest} from "../../utils/getRequest";
import {deleteRequest} from "../../utils/deleteRequest";
import {Button} from "antd";
import DeleteConfirmPopup from "../SharedElements/DeleteConfirmPopup";

const Story = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const story = useSelector(state => state.ourStories.story);
    const isEditPostMode = useSelector(state => state.ourStories.isEditPostMode);
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const edit = useSelector(state => state.i18n.buttons.edit);
    const deleteButton = useSelector(state => state.i18n.buttons.delete);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    // TODO при удалении поста непосредственно из самой истории перенаправлять на страницу историй и делать гет

    const {id} = useParams();

    const {[activeLanguage]: {title, text} = {}} = story;
    const {date} = story;
    const formattedDate = date?.slice(0, 10);

    useEffect(() => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStory(res)));
    }, [activeLanguage]);

    const handleEdit = () => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStory(res)))
            .then(() => dispatch(setEditMode(true)))
    }

    const handleDelete = () => {
        deleteRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`, JSON.stringify({}))
            .then(() => getRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setStories(res))))
            .then(() => history('/our-stories'))
    }

    const readPostLayout = () => (
        <div className="story-container--parent">
            <div className="story-container">
                <h1 style={{fontWeight: "bold", fontSize: "45px"}}>{title}</h1>
                <Markup content={text}/>
                <p style={{fontStyle: "italic"}}>{formattedDate}</p>
                {isLoggedIn && <div className="story-container--buttons">
                    <Button onClick={handleEdit}>{edit}</Button>
                    <DeleteConfirmPopup confirmDeleteHandler={handleDelete}><Button
                        danger>{deleteButton}</Button></DeleteConfirmPopup>
                </div>}
            </div>
        </div>
    )

    return (
        <>
            {isEditPostMode ? <TextEditor title={title} text={text} date={formattedDate}/> : readPostLayout()}
        </>
    )
}

export default Story;
