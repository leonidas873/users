import * as actionTypes from './actionTypes';

export const setUsers = (users) => {
    return {
        type:actionTypes.SET_USERS,
        payload:users
    }
}

export const setSearchQuery = (searchQuery) => {
    return {
        type:actionTypes.SET_SEARCH_QUERY,
        payload:searchQuery,
    }
}

export const deleteUser = (users) => {
    return {
        type:actionTypes.DELETE_USER,
        payload:users
    }
}

export const addUser = (users) => {
    return {
        type:actionTypes.ADD_USER,
        payload:users
    }
}

export const updateUser = (users) => {
    return {
        type:actionTypes.UPDATE_USER,
        payload:users
    }
}