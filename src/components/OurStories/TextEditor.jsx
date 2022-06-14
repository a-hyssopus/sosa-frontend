import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import ReactQuill from 'react-quill';
import {formats, modules} from "../../utils/textEditorConfig";

import {postRequest} from "../../utils/postRequest";
import {setCreatePostMode, setEditMode, setStories, setStory} from "../../store/ourStories/ourStories";
import {getRequest} from "../../utils/getRequest";

import 'react-quill/dist/quill.snow.css';
import LanguageDropdown from "../SharedElements/LanguageDropdown";
import {Button, Input} from "antd";

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
    const titlePlaceholder = useSelector(state => state.i18n.reports["title-placeholder"]);

    const [storyToAddLanguage, setStoryToAddLanguage] = useState(activeLanguage);

    const id = story._id;

    const handleRichEditorOnChange = (content, delta, source, editor) => {
        setRichTextValue(editor.getHTML());
    }

    const handleTitleValueChange = event => {
        setTitleValue(event.target.value);
    }

    const handleLanguageChange = value => {
        setStoryToAddLanguage(value);
    }

    const saveButtonHandler = () => {
        if (isEditPostMode) {
            console.log(storyToAddLanguage);
            postRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts/${id}`, JSON.stringify({
                [storyToAddLanguage]: {title: titleValue, text: richTextValue}
            }), 'PATCH')
                .then(() => getRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`))
                .then(res => dispatch(setStory(res)))
                .then(() => dispatch(setEditMode(false)));
        }

        if (isCreatePostMode) {
            postRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts?${new URLSearchParams({"lang": storyToAddLanguage})}`, JSON.stringify({
                [storyToAddLanguage]: {title: titleValue, text: richTextValue}, date: new Date().toISOString()
            }), 'POST')
                .then(() => getRequest(`${process.env.REACT_APP_BACKEND_URL}/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`))
                .then(res => dispatch(setStories(res)))
                .then(() => dispatch(setCreatePostMode(false)));
        }
    }

    const cancelButtonHandler = () => {
        dispatch(setEditMode(false));
        dispatch(setCreatePostMode(false));
    }

    return (
        <div className="text-editor-container">
            <div className="text-editor-container--inputs">
                <Input type="text"
                       placeholder={titlePlaceholder}
                       value={titleValue}
                       autoFocus
                       onChange={handleTitleValueChange}/>
                <LanguageDropdown activeLanguage={activeLanguage} handleLanguageChange={handleLanguageChange}/>
            </div>
            <ReactQuill theme="snow"
                        modules={modules}
                        formats={formats}
                        value={richTextValue}
                        onChange={handleRichEditorOnChange}/>
            <div className="text-editor--buttons">
                <Button onClick={cancelButtonHandler}>{cancelButton}</Button>
                <Button type="primary" onClick={saveButtonHandler}>{saveButton}</Button>
            </div>
        </div>)
}

export default TextEditor;
