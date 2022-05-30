import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useDispatch, useSelector} from "react-redux";

import {postRequest} from "../../utils/postRequest";
import {setCreatePostMode, setEditMode, setStory} from "../../store/ourStories/ourStories";
import {formats, modules} from "../../utils/textEditorConfig";
import {languages, languagesAbbreviation} from "../../utils/languages";
import {getRequest} from "../../utils/getRequest";

const TextEditor = ({title = '', text = '', date = ''}) => {
    const dispatch = useDispatch();
    const [richTextValue, setRichTextValue] = useState(text);
    const [titleValue, setTitleValue] = useState(title);

    const story = useSelector(state => state.ourStories.story);
    const isEditPostMode = useSelector(state => state.ourStories.isEditPostMode)
    const isCreatePostMode = useSelector(state => state.ourStories.isCreatePostMode)
    const saveButton = useSelector(state => state.i18n.buttons.saveButton);
    const cancelButton = useSelector(state => state.i18n.buttons.cancelButton);
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    const [storyToAddLanguage, setStoryToAddLanguage] = useState(languagesAbbreviation[0])

    const id = story._id;

    const handleRichEditorOnChange = (content, delta, source, editor) => {
        setRichTextValue(editor.getHTML());
    }

    const handleTitleValueChange = event => {
        setTitleValue(event.target.value);
    }

    const handleLanguageChange = event => {
        setStoryToAddLanguage(event.target.value);
    }

    const saveButtonHandler = () => {
        if (isEditPostMode) {
            postRequest(`http://localhost:3001/blog-posts/${id}`, JSON.stringify({
                [storyToAddLanguage]: {title: titleValue, text: richTextValue}
            }), 'PATCH')
                .then(() => getRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`))
                .then(res => dispatch(setStory(res)))
                .then(() => dispatch(setEditMode(false)));
        }

        if (isCreatePostMode) {
            postRequest(`http://localhost:3001/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`, JSON.stringify({
                [storyToAddLanguage]: {title: titleValue, text: richTextValue}, date: new Date().toISOString()
            }), 'POST')
                .then(() => getRequest(`http://localhost:3001/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`))
                .then(() => dispatch(setCreatePostMode(false)));
        }
    }

    const  cancelButtonHandler = () => {
        dispatch(setEditMode(false));
        dispatch(setCreatePostMode(false));
    }

    return (<>
        <input type="text"
               placeholder="Title"
               value={titleValue}
               autoFocus
               onChange={handleTitleValueChange}/>
        <select onChange={handleLanguageChange}>
            {languages.map((lang, index) => <option value={languagesAbbreviation[index]}
                                                    key={lang}
            >{lang}</option>)}
        </select>
        <ReactQuill theme="snow"
                    modules={modules}
                    formats={formats}
                    value={richTextValue}
                    onChange={handleRichEditorOnChange}/>
        <button onClick={saveButtonHandler}>{saveButton}</button>
        <button onClick={cancelButtonHandler}>{cancelButton}</button>
        {/*TODO change visibility of buttons depending on user's rights*/}
    </>)
}

export default TextEditor;
