// hooks/useSocket.ts
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { applyUpdatedProduct } from "@/redux/slices/productsSlice";
import { updateOrderStatus } from "@/redux/slices/ordersSlice";
import socket from "@/utils/socket";

export const useSocket = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		// Connect immediately for public events
		socket.connect();

		// Public listeners (e.g., live product updates)
		socket.on("inventory:updated", (product) => {
			dispatch(applyUpdatedProduct(product));
		});

		socket.emit("join-room", "global-room");

		socket.on("order:status-changed", ({ orderId, status }) => {
			dispatch(updateOrderStatus({ orderId, status }));
		});

		return () => {
			socket.off("inventory:updated");
			socket.off("order:status-changed");
			socket.disconnect();
		};
	}, []);
};
