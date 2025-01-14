import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = { email: '', nickname: '' };

const loadMemberCookie = () => {
    const memberInfo = getCookie("member") || {}; // null 방지

    if (memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    }
    console.log("Loaded Member Cookie:", memberInfo); // 디버깅용
    return memberInfo;
};

export const loginPostAsync = createAsyncThunk('loginPostAsync', async (param) => {
    const response = await loginPost(param);
    console.log("API Response:", response); // 디버깅용
    return response;
});

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("login action:", action.payload);
            state.email = action.payload.email;
            state.nickname = action.payload.nickname;
        },
        logout: (state) => {
            removeCookie("member");
            state.email = '';
            state.nickname = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                const payload = action.payload || {};
                state.email = payload.email || '';
                state.nickname = payload.nickname || '';
                
                console.log("action payload에 담긴 값 : ", payload)

                if (!payload.error) {
                    setCookie("member", JSON.stringify(payload), 1);
                }
            })
            .addCase(loginPostAsync.pending, () => {
                console.log("pending");
            })
            .addCase(loginPostAsync.rejected, () => {
                console.log("rejected");
            });
    }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
