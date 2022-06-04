import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setCreatePostMode, setStories} from "../../store/ourStories/ourStories";
import {getRequest} from "../../utils/getRequest";
import TextEditor from "./TextEditor";
import StoryCard from "./Card";

const OurStories = () => {
    const dispatch = useDispatch();

    const stories = useSelector(state => state.ourStories.stories);

    const activeLanguage = useSelector((state) => state.i18n.activeLanguage)
    const saveEntryButton = useSelector((state) => state.i18n.buttons.saveEntryButton)
    const isCreatePostMode = useSelector(state => state.ourStories.isCreatePostMode);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    useEffect(() => {
        getRequest(`http://localhost:3001/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStories(res)))
    }, [activeLanguage])
    // }, [activeLanguage, isCreatePostMode])

    const handleSaveEntryButtonClick = () => {
        dispatch(setCreatePostMode(true));
    }

    const readStoriesLayout = () => (
        <>
            {isLoggedIn && <button onClick={handleSaveEntryButtonClick}>{saveEntryButton}</button>}
            {stories.length && (
                stories.map(el => (el[activeLanguage] && <StoryCard
                    date={el.date}
                    key={el._id}
                    id={el._id}
                    title={el?.[activeLanguage]?.title}
                    text={el?.[activeLanguage]?.text}/>)))}
        </>
    )

    return (
        <div>
            {isCreatePostMode ? <TextEditor/> : readStoriesLayout()}
        </div>)
}

export default OurStories;
