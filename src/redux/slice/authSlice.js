import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API, PRIVATE_API } from "../../api/apiIndex";

const _accessToken = JSON.parse(localStorage.getItem("accessToken"));

const initialState = {
  accessToken: _accessToken ? _accessToken : null,
  data: null,
  loginError: "",
  loginStatus: "idle",
  signupError: "",
  signupStatus: "idle",
  loginWithTokenStatus: "idle",
  loginWithTokenError: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await NODE_API.post("/auth/login", userData);
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await NODE_API.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const loginwithtoken = createAsyncThunk(
  "auth/loginwithtoken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/auth/getByToken");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await NODE_API.get("auth/logout", {
      //   withCredentials: true,
      // });
      localStorage.removeItem("accessToken");
      return { data: "success" };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeLoginMessage: (state) => {
      state.loginError = "";
      state.loginStatus = "idle";
    },
    removeSignupMessage: (state) => {
      state.signupError = "";
      state.signupStatus = "idle";
    },
    removeLoginWithTokenMessage: (state) => {
      state.loginWithTokenStatus = "idle";
      state.loginWithTokenError = "";
    },
    // logoutComplete: (state) => {},
  },
  extraReducers: (builder) => {
    //Login
    builder
      .addCase(login.pending, (state) => {
        // console.log(action);
        state.loginStatus = "loading";
        state.loginError = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log(action);
        state.loginStatus = "success";
        state.loginError = "";
        state.accessToken = action.payload.accessToken;
        state.data = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        // console.log(action.payload);
        state.loginStatus = "failed";
        state.loginError = action.payload.message;
      })
      // Sign Up
      .addCase(signup.pending, (state) => {
        state.signupStatus = "loading";
        state.signupError = "";
      })
      .addCase(signup.fulfilled, (state) => {
        state.signupStatus = "success";
        state.signupError = "";
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupStatus = "failed";
        state.signupError = action.payload.message;
      })
      //Login with token
      .addCase(loginwithtoken.pending, (state) => {
        // console.log(action);
        state.loginWithTokenStatus = "loading";
        state.loginWithTokenError = "";
      })
      .addCase(loginwithtoken.fulfilled, (state, action) => {
        // console.log(action);
        state.loginWithTokenStatus = "success";
        state.loginWithTokenError = "";
        state.data = action.payload.data;
      })
      .addCase(loginwithtoken.rejected, (state, action) => {
        // console.log(action.payload);
        state.accessToken = null;
        localStorage.removeItem("accessToken");
        state.loginWithTokenStatus = "failed";
        state.loginWithTokenError = action.payload.message;
        // console.log(action);
      })

      //Logout
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
        state.accessToken = null;
        state.status = "idle";
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {
  removeLoginMessage,
  removeSignupMessage,
  removeLoginWithTokenMessage,
  logoutComplete,
} = authSlice.actions;

export const getUser = (state) => state.auth.data;
export const getUserName = (state) => state.auth.data?.name;
export const getUserEmail = (state) => state.auth.data?.email;
export const getUserID = (state) => state.auth.data?.id;
export const getUserRole = (state) => state.auth.data?.role;

export const getAccessToken = (state) => state.auth.accessToken;

export const getLoginStatus = (state) => state.auth.loginStatus;
export const getLoginError = (state) => state.auth.loginError;

export const getsignupStatus = (state) => state.auth.signupStatus;
export const getsignupError = (state) => state.auth.signupError;

export const getLoginWithTokenStatus = (state) =>
  state.auth.loginWithTokenStatus;
export const getLoginWithTokenError = (state) => state.auth.loginWithTokeEerror;

export default authSlice.reducer;
