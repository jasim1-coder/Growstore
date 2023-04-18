import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  data: [],
  fetchStatus: "idle",
  fetchError: "",

  nameQuery: "",
  limit: 10,
  totalUsers: 0,
  currentPage: 1,
  sortOrder: "",

  singleData: "",
  singleStatus: "idle",
  singleError: "",
};

export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetchAdminUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/auth/", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchAdminSingleUser = createAsyncThunk(
  "adminUsers/fetchAdminSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get(`/auth/single/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const updateUserAdmin = createAsyncThunk(
  "adminUsers/updateUserAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.put(`/auth/${data.id}`, data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const usersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    removeAdminUsersError: (state) => {
      state.fetchError = "";
      state.fetchStatus = "idle";
    },
    removeAdminSingleUser: (state) => {
      state.singleData = "";
      state.singleStatus = "idle";
      state.singleError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.data = action.payload.data;
        state.nameQuery = action.payload.nameQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.sortOrder = action.payload.sortOrder;
        state.totalUsers = action.payload.totalUsers;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      })

      .addCase(fetchAdminSingleUser.pending, (state) => {
        state.singleStatus = "loading";
        state.singleError = "";
      })
      .addCase(fetchAdminSingleUser.fulfilled, (state, action) => {
        state.singleStatus = "success";
        state.singleError = "";
        state.singleData = action.payload.data;
      })
      .addCase(fetchAdminSingleUser.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.payload.message;
      })

      .addCase(updateUserAdmin.pending, (state) => {
        state.singleStatus = "loading";
        state.singleError = "";
      })
      .addCase(updateUserAdmin.fulfilled, (state, action) => {
        state.singleStatus = "success";
        state.singleError = "";
        state.singleData = { ...state.singleData, ...action.payload.data };
        state.data = state.data.map((entry) =>
          entry._id === action.payload.id
            ? { ...entry, ...action.payload.data }
            : entry
        );
      })
      .addCase(updateUserAdmin.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.payload.message;
      });
  },
});

export const { removeAdminUsersError, removeAdminSingleUser } =
  usersSlice.actions;

export const getAdminUsersData = (state) => state.adminUsers.data;
export const getAdminUsersFetchStatus = (state) => state.adminUsers.fetchStatus;
export const getAdminUsersFetchError = (state) => state.adminUsers.fetchError;

export const getAdminUsersNameQuery = (state) => state.adminUsers.nameQuery;
export const getAdminUsersLimit = (state) => state.adminUsers.limit;
export const getAdminUsersCurrentPage = (state) => state.adminUsers.currentPage;
export const getAdminUsersSortOrder = (state) => state.adminUsers.sortOrder;
export const getAdminUsersTotalUsers = (state) => state.adminUsers.totalUsers;

export const getAdminSingleUsersData = (state) => state.adminUsers.singleData;
export const getAdminSingleUserFetchStatus = (state) =>
  state.adminUsers.singleStatus;
export const getAdminSingleUserFetchError = (state) =>
  state.adminUsers.singleError;

export default usersSlice.reducer;
