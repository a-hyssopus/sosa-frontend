import React from "react"
import {Card} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Markup} from 'interweave';

import {setEditMode, setStories, setStory} from "../../store/ourStories/ourStories";
import {getRequest} from "../../utils/getRequest";
import {deleteRequest} from "../../utils/deleteRequest";

const {Meta} = Card;

const StoryCard = ({title, text, src, id, date}) => {
    const dispatch = useDispatch();
    const editButton = useSelector(state => state.i18n.editButton);
    const deleteButton = useSelector(state => state.i18n.deleteButton);
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    const history = useNavigate();

    const formattedDate = date?.slice(0, 10);
    const formattedText = text?.substring(0, text.indexOf('.'));

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
        deleteRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then((res) => getRequest(`http://localhost:3001/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setStories(res))));
    }

    return (
        <>
            <Link to={`/our-stories/${id}`}>
                <Card
                    hoverable
                    onClick={handleStoryOnClick}
                    style={{width: 240}}
                    cover={<img src={src}/>}
                >
                    <Meta title={title}/>
                    <Markup content={formattedText}/>
                    <p>{formattedDate}</p>
                </Card>
            </Link>
            <button onClick={handleEdit}>{editButton}</button>
            <button onClick={handleDelete}>{deleteButton}</button>
        </>
    )
}

export default StoryCard;
