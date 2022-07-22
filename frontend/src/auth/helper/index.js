import {API} from "../../backend";
//API means;

export const signup = user => {
    return fetch(`${API}/signup`,{})
}