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

const usersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    removeAdminUsersError: (state) => {
      state.fetchError = "";
      state.fetchStatus = "idle";
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
      });
  },
});

export const { removeAdminUsersError } = usersSlice.actions;

export const getAdminUsersData = (state) => state.adminUsers.data;
export const getAdminUsersFetchStatus = (state) => state.adminUsers.fetchStatus;
export const getAdminUsersFetchError = (state) => state.adminUsers.fetchError;

export const getAdminUsersNameQuery = (state) => state.adminUsers.nameQuery;
export const getAdminUsersLimit = (state) => state.adminUsers.limit;
export const getAdminUsersCurrentPage = (state) => state.adminUsers.currentPage;
export const getAdminUsersSortOrder = (state) => state.adminUsers.sortOrder;
export const getAdminUsersTotalUsers = (state) => state.adminUsers.totalUsers;

export default usersSlice.reducer;
