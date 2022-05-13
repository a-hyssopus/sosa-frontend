import React, {useEffect} from "react";
import StoryCard from "./Card";
import {useDispatch, useSelector} from "react-redux";
import {setStories} from "../../store/ourStories/ourStories";

const OurStories = () => {
    const dispatch = useDispatch();
    const activeLanguage = useSelector((state) => state.i18n.language)
    const stories = useSelector(state => state.ourStories.stories);

    useEffect(() => {
        fetch('http://localhost:3001/blog-posts')
            .then(res => res.json())
            .then(res => dispatch(setStories(res)))
    }, [activeLanguage])

    return (
        <div>
            {stories.map(el =>
                    <StoryCard
                        date={el.date}
                        key={el._id}
                        id={el._id}
                        title={el.title}
                        text={el.text}
                        src={el["image-src"]}
                        author={el.author}/>)}
        </div>
    )
}

export default OurStories;
