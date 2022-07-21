import React from "react"
import {Button, Card} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Markup} from 'interweave';

import {setEditMode, setStories, setStory} from "../../store/ourStories/ourStories";
import {getRequest} from "../../utils/getRequest";
import {deleteRequest} from "../../utils/deleteRequest";

import "./style.scss"
import DeleteConfirmPopup from "../SharedElements/DeleteConfirmPopup";

const {Meta} = Card;

const StoryCard = ({ title, text, id, date }) => {
    const dispatch = useDispatch();
    const edit = useSelector(state => state.i18n.buttons.edit);
    const deleteButton = useSelector(state => state.i18n.buttons.delete);
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const history = useNavigate();

    const formattedDate = date?.slice(0, 10);

    const src = text.match(/(?<=\<img src=")(.*?)(?="\>)/);

    const handleStoryOnClick = () => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStory(res)))
    }

    const handleEdit = () => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStory(res)))
            .then(() => dispatch(setEditMode(true)))
            .then(() => history(`/our-stories/${id}`));
    }

    const handleDelete = () => {
        deleteRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`, JSON.stringify({}))
            .then(() => getRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setStories(res))));
    }

    return (
        <div className="story-card">
            <Link to={`/our-stories/${id}`}>
                <Card
                    hoverable
                    onClick={handleStoryOnClick}
                    // style={{width: 300}}
                    cover={src && src.length && <img src={src[0]} className="ant-card--image"
                                                     // style={{maxWidth: "300px", minHeight: "300px", maxHeight: "260px",  objectFit: "cover"}}
                    />}
                >
                    <Meta title={title} style={{fontWeight: "700"}} description={formattedDate}/>
                </Card>
            </Link>
            {isLoggedIn && <>
                <Button onClick={handleEdit}>{edit}</Button>
                <DeleteConfirmPopup confirmDeleteHandler={handleDelete}><Button danger>{deleteButton}</Button></DeleteConfirmPopup>
            </>}
        </div>
    )
}

export default StoryCard;
