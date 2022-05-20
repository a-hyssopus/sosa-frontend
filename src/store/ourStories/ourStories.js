import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    stories: [],
    story: {},
    // storyToAddLanguage: "",
    isEditPostMode: false,
    isCreatePostMode: false,
}

export const outStoriesSlice = createSlice({
    name: 'ourStories',
    initialState,
    reducers: {
        setStories(state, {payload}) {
            state.stories = payload;
        },
        setStory(state, {payload}) {
            state.story = payload;
        },
        setEditMode(state, {payload}) {
            state.isEditPostMode = payload;
        },
        setCreatePostMode(state, {payload}) {
            state.isCreatePostMode = payload;
        },
    },
})

export const { setStories, setStory, setEditMode, setCreatePostMode, setStoryToAddLanguage } = outStoriesSlice.actions

export default outStoriesSlice.reducer
