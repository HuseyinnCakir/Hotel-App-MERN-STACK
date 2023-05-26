import { createSlice } from '@reduxjs/toolkit'

import { getNavbarItems, getSocialLinks, adminNavbar } from '../../data/links'
const initialState = {
  navbarItems: getNavbarItems,
  socialLinks: getSocialLinks,
  adminNavbar: adminNavbar,
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  /*reducers: {
    getNavbarItem: (state, action) => {
      state.navbarItems = getNavbarItems
    },
    getSocialLink: (state, action) => {
      state.socialLinks = getSocialLinks
    },
  },*/
})

//export const { getNavbarItem, getSocialLink } = headerSlice.actions

export default headerSlice.reducer
