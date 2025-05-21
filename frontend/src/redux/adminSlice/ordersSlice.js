import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  data: [],
  fetchStatus: "idle",
  fetchError: "",

  orderIdQuery: "",
  limit: 10,
  totalOrders: 0,
  currentPage: 1,
  sortOrder: "",

  singleData: "",
  singleStatus: "idle",
  singleError: "",
};

export const fetchAdminOrders = createAsyncThunk(
  "adminOrder/fetchAdminOrders",
  async (params = {}, { rejectWithValue }) => {
    try {
      // Provide default values for parameters if not provided
      const {
        orderIdQuery = "", // Default to empty string if no query
        page = 1, // Default to page 1 if no page provided
        limit = 10, // Default to 10 orders per page
        sortOrder = "", // Default to no sorting
      } = params;

      // Construct query string with URLSearchParams
      const queryString = new URLSearchParams({
        orderIdQuery,
        page: page.toString(),
        limit: limit.toString(),
        sortOrder
      }).toString();

      const url = `http://localhost:3001/orders?${queryString}`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      console.log(data)
      return data; // Assuming 'data' contains the array of orders and other metadata
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  }
);


export const fetchAdminSingleOrder = createAsyncThunk(
  "adminOrder/fetchAdminSingleOrder",
  async (id, { rejectWithValue }) => {
    try {
      // Fetch the single order based on ID
      const response = await fetch(`http://localhost:3001/orders/${String(id)}`, {
        method: "GET",
      });


      if (!response.ok) {
        throw new Error("Failed to fetch the order");
      }

      const data = await response.json();
      console.log("Order object:", data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  }
);

export const updateAdminOrder = createAsyncThunk(
  "adminOrder/updateAdminOrder",
  async (data, { rejectWithValue }) => {
    try {
      // Assuming the data is in the form { id, params }
      const { id, params } = data;

      // Perform PUT request to update the order
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error("Failed to update the order");
      }

      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  }
);



const ordersSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    removeAdminOrdersError: (state) => {
      state.fetchError = "";
      state.fetchStatus = "idle";
    },
    removeAdminSingleOrder: (state) => {
      state.singleData = "";
      state.singleStatus = "idle";
      state.singleError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
.addCase(fetchAdminOrders.fulfilled, (state, action) => {
  state.fetchStatus = "success";
  state.fetchError = "";
  state.data = action.payload;  // Assuming 'orders' is the key in the response
  state.orderIdQuery = action.payload.orderIdQuery;
  state.limit = action.payload.limit;
  state.currentPage = action.payload.currentPage;
  state.sortOrder = action.payload.sortOrder;
  state.totalOrders = action.payload.length;
})
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      })

      .addCase(fetchAdminSingleOrder.pending, (state) => {
        state.singleStatus = "loading";
        state.singleError = "";
      })
      .addCase(fetchAdminSingleOrder.fulfilled, (state, action) => {
        state.singleStatus = "success";
        state.singleError = "";
        state.singleData = action.payload;
      })
      .addCase(fetchAdminSingleOrder.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.payload.message;
      })

      .addCase(updateAdminOrder.pending, (state) => {
        state.singleStatus = "loading";
        state.singleError = "";
      })
      .addCase(updateAdminOrder.fulfilled, (state, action) => {
        state.singleStatus = "success";
        state.singleError = "";
        state.singleData = {
          ...state.singleData,
          status: action.payload.status,
          deliveredDate: action.payload.deliveredDate,
          cancelledDate: action.payload.cancelledDate,
        };
        state.data = state.data.map((entry) =>
          entry._id === action.payload.id
            ? { ...entry, status: action.payload.status }
            : entry
        );
      })
      .addCase(updateAdminOrder.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.payload.message;
      });
  },
});

export const { removeAdminOrdersError, removeAdminSingleOrder } =
  ordersSlice.actions;

export const getAdminOrdersData = (state) => state.adminOrder.data;
export const getAdminOrderFetchStatus = (state) => state.adminOrder.fetchStatus;
export const getAdminOrderFetchError = (state) => state.adminOrder.fetchError;

export const getAdminOrderIdQuery = (state) => state.adminOrder.orderIdQuery;
export const getAdminOrderLimit = (state) => state.adminOrder.limit;
export const getAdminOrderCurrentPage = (state) => state.adminOrder.currentPage;
export const getAdminOrderSortOrder = (state) => state.adminOrder.sortOrder;
export const getAdminOrderTotalOrders = (state) => state.adminOrder.totalOrders;

export const getAdminSingleOrdersData = (state) => state.adminOrder.singleData;
export const getAdminSingleOrderFetchStatus = (state) =>
  state.adminOrder.singleStatus;
export const getAdminSingleOrderFetchError = (state) =>
  state.adminOrder.singleError;

export default ordersSlice.reducer;
