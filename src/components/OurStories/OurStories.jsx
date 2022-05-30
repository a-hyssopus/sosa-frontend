import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setCreatePostMode, setStories} from "../../store/ourStories/ourStories";
import {getRequest} from "../../utils/getRequest";
import TextEditor from "./TextEditor";
import StoryCard from "./Card";

const OurStories = () => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector((state) => state.i18n.activeLanguage)
    const saveEntryButton = useSelector((state) => state.i18n.buttons.saveEntryButton)
    const stories = useSelector(state => state.ourStories.stories);
    const isCreatePostMode = useSelector(state => state.ourStories.isCreatePostMode);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const handleSaveEntryButtonClick = () => {
        dispatch(setCreatePostMode(true));
    }

    useEffect(() => {
        getRequest(`http://localhost:3001/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setStories(res)))
    }, [activeLanguage, isCreatePostMode])

    return (
        <div>
            {isCreatePostMode ? <TextEditor/> : (
                <>
                    {isLoggedIn && <button onClick={handleSaveEntryButtonClick}>{saveEntryButton}</button>}
                    {stories.length && (
                        stories.map(el => (
                            <StoryCard
                                date={el.date}
                                key={el._id}
                                id={el._id}
                                title={el?.[activeLanguage]?.title}
                                text={el?.[activeLanguage]?.text}
                                src={el["image-src"]}/>)
                        )
                    )}
                </>)
            }
        </div>)
}

export default OurStories;
