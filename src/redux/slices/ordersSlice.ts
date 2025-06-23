// store/orders/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/data/types";
import { fetchOrders, fetchMyOrders, fetchOrder, createOrder, cancelOrder } from "../thunks/orders";

export interface OrderState {
	orders: Order[];
	myOrders: Order[];
	selectedOrder: Order | null;
	loading: boolean;
	error: string | null;
	hasBeenFetched: boolean;
}

export const initialState: OrderState = {
	orders: [],
	myOrders: [],
	selectedOrder: null,
	loading: false,
	error: null,
	hasBeenFetched: false,
};

const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: string }>) => {
			const index = state.orders.findIndex((o) => o.id === action.payload.orderId);
			if (index !== -1) {
				state.orders[index].status = action.payload.status as Order["status"];
			}
		},
		addNewOrder: (state, action: PayloadAction<Order>) => {
			state.orders.unshift(action.payload); // Add new order to top
		},
		resetOrderState: (state) => {
			state.orders = [];
			state.myOrders = [];
			state.selectedOrder = null;
			state.loading = false;
			state.error = null;
			state.hasBeenFetched = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrders.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.orders = action.payload;
				state.hasBeenFetched = true;
				state.error = null;
			})
			.addCase(fetchOrders.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchMyOrders.fulfilled, (state, action) => {
				state.myOrders = action.payload;
			})
			.addCase(fetchOrder.fulfilled, (state, action) => {
				state.selectedOrder = action.payload;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.orders.unshift(action.payload); // Treat as a new order
			})
			.addCase(cancelOrder.fulfilled, (state, action) => {
				const index = state.orders.findIndex((o) => o.id === action.payload.id);
				if (index !== -1) {
					state.orders[index] = action.payload;
				}
			});
	},
});

export const { updateOrderStatus, addNewOrder, resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
