import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setStory} from "../../store/ourStories/ourStories";

const Story = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const story = useSelector(state => state.ourStories.story);
    const {title, text, "image-src": src, author, date} = story;
    const formattedDate = date.slice(0, 10)

    useEffect(() => {
        fetch(`http://localhost:3001/blog-posts/${id}`)
            .then(res => res.json())
            .then(res => dispatch(setStory(res)))
    }, [story])

    return (
        <div>
            <h1>{title}</h1>
            <img src={src} alt="Article Image"/>
            <p>{text}</p>
            <p>{formattedDate}</p>
            <p>{author}</p>
        </div>
    )
}

export default Story;
