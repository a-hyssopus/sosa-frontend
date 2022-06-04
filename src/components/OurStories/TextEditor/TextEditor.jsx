import { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

import './styles.scss';

Quill.register('modules/imageResize', ImageResize);

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = { editorHtml: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
    }

    render() {
        return (
            <ReactQuill
                theme={this.state.theme}
                onChange={this.handleChange}
                value={this.state.editorHtml}
                modules={Editor.modules}
                formats={Editor.formats}
                bounds={'#root'}
                placeholder={this.props.placeholder}
            />
        );
    }
}

Editor.modules = {
    toolbar: [
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
        ],
        ['link', 'image', 'video'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: true
    },
    imageResize: {
        // parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
    }
};

Editor.formats = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
];

export default Editor;
