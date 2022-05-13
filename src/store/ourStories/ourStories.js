import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    stories: [],
    story: {}
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
        }
    },
})

export const { setStories, setStory } = outStoriesSlice.actions

export default outStoriesSlice.reducer
