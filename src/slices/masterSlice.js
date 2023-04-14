import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: "",
    activeLink: "home",
    isActivePersonAdder: false,
    isActiveCarAdder: false
};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {

        setSearch: (state, action) => {
            state.search = action.payload
        },
        setActiveLink: (state, action) => {
            state.activeLink = action.payload
        },
        setIsActivePersonAdder: (state, action) => {
            state.isActivePersonAdder = action.payload
        },
        setIsActiveCarAdder: (state, action) => {
            state.isActiveCarAdder = action.payload
        }

    }
})


export const { setSearch, setActiveLink, setIsActivePersonAdder, setIsActiveCarAdder } = masterSlice.actions

export default masterSlice.reducer