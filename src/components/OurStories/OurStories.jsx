import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setCreatePostMode, setStories} from "../../store/ourStories/ourStories";
import {getRequest} from "../../utils/getRequest";
import TextEditor from "./TextEditor";
import StoryCard from "./Card";

import "./style.scss"
import {Button} from "antd";

const OurStories = () => {
    const dispatch = useDispatch();

    const stories = useSelector(state => state.ourStories.stories);

    const activeLanguage = useSelector((state) => state.i18n.activeLanguage);
    const isCreatePostMode = useSelector(state => state.ourStories.isCreatePostMode);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    useEffect(() => {
        getRequest('process.env.REACT_APP_BACKEND_URL/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStories(res)))
    }, [activeLanguage])

    const handleSaveEntryButtonClick = () => {
        dispatch(setCreatePostMode(true));
    }

    const readStoriesLayout = () => (
        <div className="stories-container">
            <div className="stories-container--cards">
            {isLoggedIn && <Button size="large" onClick={handleSaveEntryButtonClick} shape="circle">+</Button>}
            {stories.length && (
                stories.map(el => (el[activeLanguage] && <StoryCard
                    date={el.date}
                    key={el._id}
                    id={el._id}
                    title={el?.[activeLanguage]?.title}
                    text={el?.[activeLanguage]?.text}/>)))}
            </div>
        </div>
    )

    return (
        <>
            {isCreatePostMode ? <TextEditor/> : readStoriesLayout()}
        </>)
}

export default OurStories;
