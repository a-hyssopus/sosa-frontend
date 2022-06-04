import React from "react"
import {Card} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Markup} from 'interweave';

import {setEditMode, setStories, setStory} from "../../store/ourStories/ourStories";
import {getRequest} from "../../utils/getRequest";
import {deleteRequest} from "../../utils/deleteRequest";

const {Meta} = Card;

const StoryCard = ({ title, text, id, date }) => {
    const dispatch = useDispatch();
    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const deleteButton = useSelector(state => state.i18n.buttons.deleteButton);
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const history = useNavigate();

    const formattedDate = date?.slice(0, 10);
    const formattedText = text?.substring(0, text.indexOf('.'));

    const src = text.match(/(?<=\<img src=")(.*?)(?="\>)/);

    const handleStoryOnClick = () => {
        getRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStory(res)))
    }

    const handleEdit = () => {
        getRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStory(res)))
            .then(() => dispatch(setEditMode(true)))
            .then(() => history(`/our-stories/${id}`));
    }

    const handleDelete = () => {
        deleteRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`, JSON.stringify({}))
            .then(() => getRequest(`http://localhost:3001/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setStories(res))));
    }

    return (
        <>
            <Link to={`/our-stories/${id}`}>
                <Card
                    hoverable
                    onClick={handleStoryOnClick}
                    style={{width: 240}}
                    cover={src && src.length && <img src={src[0]}/>}
                >
                    <Meta title={title}/>
                    <Markup content={formattedText}/>
                    <p>{formattedDate}</p>
                </Card>
            </Link>
            {isLoggedIn && <>
                <button onClick={handleEdit}>{editButton}</button>
                <button onClick={handleDelete}>{deleteButton}</button>
            </>}
        </>
    )
}

export default StoryCard;
