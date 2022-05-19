import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useDispatch, useSelector} from "react-redux";

import {postRequest} from "../../utils/postRequest";
import {setCreatePostMode, setEditMode} from "../../store/ourStories/ourStories";
import {formats, modules} from "../../utils/textEditorConfig";

const TextEditor = ({title = '', text = '', date = ''}) => {
    const dispatch = useDispatch();
    const [richTextValue, setRichTextValue] = useState(text);
    const [titleValue, setTitleValue] = useState(title);

    const story = useSelector(state => state.ourStories.story);
    const isEditPostMode = useSelector(state => state.ourStories.isEditPostMode)
    const isCreatePostMode = useSelector(state => state.ourStories.isCreatePostMode)
    const saveButton = useSelector(state => state.i18n.saveButton);

    const languageDropdownOptions = [""]

    const handleRichEditorOnChange = (content, delta, source, editor) => {
        setRichTextValue(editor.getHTML());
    }

    const handleTitleValueChange = event => {
        setTitleValue(event.target.value);
    }

    return (
        <>
            <input type="text"
                   placeholder="Title"
                   value={titleValue}
                   autoFocus
                   onChange={handleTitleValueChange}/>
            <ReactQuill theme="snow"
                        modules={modules}
                        formats={formats}
                        value={richTextValue}
                        onChange={handleRichEditorOnChange}/>
            <button onClick={() => {
                isEditPostMode && postRequest(`http://localhost:3001/blog-posts/${story._id}`, JSON.stringify({
                    title: titleValue,
                    text: richTextValue,
                }), 'PATCH');
                dispatch(setEditMode(false));

                isCreatePostMode && postRequest('http://localhost:3001/blog-posts', JSON.stringify({
                    title: titleValue,
                    text: richTextValue,
                    date: new Date().toISOString()
                }), 'POST');
                dispatch(setCreatePostMode(false));
            }}>{saveButton}</button>
            {/*TODO change visibility of buttons depending on user's rights*/}
        </>
    )
}

export default TextEditor;
