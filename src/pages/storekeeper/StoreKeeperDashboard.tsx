// pages/storekeeper/StoreKeeperDashboard.tsx
import { useEffect, useMemo } from "react";
import { Package, AlertTriangle, Boxes, RefreshCw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	selectProductError,
	selectProductLoading,
	selectProducts,
	selectHasBeenFetched,
} from "@/redux/selectors/productsSelectors";
import { fetchProducts } from "@/redux/thunks/products";

const StoreKeeperDashboard = () => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(selectProducts);
	const isLoading = useAppSelector(selectProductLoading);
	const error = useAppSelector(selectProductError);
	const hasBeenFetched = useAppSelector(selectHasBeenFetched);

	// Fetch products on mount if not already fetched
	useEffect(() => {
		if (!hasBeenFetched && !isLoading) {
			dispatch(fetchProducts());
		}
	}, [dispatch, hasBeenFetched, isLoading]);

	// Calculate real stats from products
	const stats = useMemo(() => {
		const totalProducts = products.length;
		const lowStockThreshold = 10; // Define what constitutes "low stock"

		const lowStock = products.filter(
			(product) => product.stockCount > 0 && product.stockCount <= lowStockThreshold,
		).length;

		const outOfStock = products.filter((product) => product.stockCount === 0 || !product.inStock).length;

		const averageStock =
			products.length > 0
				? Math.round(products.reduce((sum, product) => sum + (product.stockCount || 0), 0) / products.length)
				: 0;

		return {
			totalProducts,
			lowStock,
			outOfStock,
			averageStock,
		};
	}, [products]);

	// Generate recent activity from products (simulate recent changes)
	const recentActivity = useMemo(() => {
		const activities: any = [];

		// Add low stock alerts
		const lowStockProducts = products.filter((p) => p.stockCount > 0 && p.stockCount <= 10);
		lowStockProducts.slice(0, 3).forEach((product, index) => {
			activities.push({
				id: `low-${product.id}`,
				action: "Low stock alert",
				item: product.name,
				quantity: product.stockCount,
				time: `${(index + 1) * 2} hours ago`,
				type: "warning",
			});
		});

		// Add out of stock alerts
		const outOfStockProducts = products.filter((p) => p.stockCount === 0);
		outOfStockProducts.slice(0, 2).forEach((product, index) => {
			activities.push({
				id: `out-${product.id}`,
				action: "Out of stock",
				item: product.name,
				quantity: 0,
				time: `${(index + 1) * 4} hours ago`,
				type: "error",
			});
		});

		// Add high stock items (simulated restocks)
		const highStockProducts = products.filter((p) => p.stockCount > 50);
		highStockProducts.slice(0, 2).forEach((product, index) => {
			activities.push({
				id: `restock-${product.id}`,
				action: "Recently restocked",
				item: product.name,
				quantity: product.stockCount,
				time: `${index + 1} day ago`,
				type: "success",
			});
		});

		// Sort by most recent and limit to 6 items
		return activities.slice(0, 6);
	}, [products]);

	// Error handling
	if (error) {
		return (
			<div className="space-y-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Inventory Overview</h1>
					<p className="text-gray-600">Monitor and manage your inventory status</p>
				</div>

				<div className="bg-white rounded-lg shadow-sm border border-red-200 p-8">
					<div className="text-center">
						<AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
						<h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Inventory Data</h3>
						<p className="text-red-600 mb-4">{error}</p>
						<button
							onClick={() => dispatch(fetchProducts())}
							className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
						>
							<RefreshCw className="w-4 h-4" />
							Try Again
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Inventory Overview</h1>
					<p className="text-gray-600">Monitor and manage your inventory status</p>
				</div>

				{/* Refresh Button */}
				<button
					onClick={() => dispatch(fetchProducts())}
					disabled={isLoading}
					className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
					{isLoading ? "Refreshing..." : "Refresh Data"}
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-blue-100 rounded-lg">
							<Package className="w-6 h-6 text-blue-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">
								{isLoading ? "..." : stats.totalProducts.toLocaleString()}
							</h3>
							<p className="text-sm text-gray-600">Total Products</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-yellow-100 rounded-lg">
							<AlertTriangle className="w-6 h-6 text-yellow-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">{isLoading ? "..." : stats.lowStock}</h3>
							<p className="text-sm text-gray-600">Low Stock Items</p>
							<p className="text-xs text-yellow-600">≤ 10 items</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-red-100 rounded-lg">
							<AlertTriangle className="w-6 h-6 text-red-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">{isLoading ? "..." : stats.outOfStock}</h3>
							<p className="text-sm text-gray-600">Out of Stock</p>
							<p className="text-xs text-red-600">Immediate attention needed</p>
						</div>
					</div>
				</div>
			</div>

			{/* Recent Activity */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="p-6 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">Inventory Alerts & Activity</h2>
				</div>
				<div className="p-6">
					{isLoading ? (
						<div className="flex items-center justify-center py-8">
							<RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
							<span className="ml-2 text-gray-600">Loading activity...</span>
						</div>
					) : recentActivity.length > 0 ? (
						<div className="space-y-4">
							{recentActivity.map((activity: any) => (
								<div key={activity.id} className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<div
											className={`p-2 rounded-lg ${
												activity.type === "warning"
													? "bg-yellow-100"
													: activity.type === "error"
													? "bg-red-100"
													: activity.type === "success"
													? "bg-green-100"
													: "bg-blue-100"
											}`}
										>
											<Boxes
												className={`w-4 h-4 ${
													activity.type === "warning"
														? "text-yellow-600"
														: activity.type === "error"
														? "text-red-600"
														: activity.type === "success"
														? "text-green-600"
														: "text-blue-600"
												}`}
											/>
										</div>
										<div>
											<p className="text-sm font-medium text-gray-900">{activity.action}</p>
											<p className="text-sm text-gray-600">{activity.item}</p>
										</div>
									</div>
									<div className="text-right">
										<p
											className={`text-sm font-medium ${
												activity.type === "error"
													? "text-red-600"
													: activity.type === "warning"
													? "text-yellow-600"
													: activity.type === "success"
													? "text-green-600"
													: "text-gray-900"
											}`}
										>
											{activity.quantity} {activity.quantity === 1 ? "unit" : "units"}
										</p>
										<p className="text-xs text-gray-500">{activity.time}</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8">
							<Boxes className="w-12 h-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-sm font-medium text-gray-900 mb-1">No Recent Activity</h3>
							<p className="text-sm text-gray-600">Inventory activity will appear here</p>
						</div>
					)}
				</div>
			</div>

			{/* Action Items */}
			{!isLoading && (stats.lowStock > 0 || stats.outOfStock > 0) && (
				<div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
					<div className="flex items-start">
						<AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
						<div className="ml-3">
							<h3 className="text-sm font-medium text-amber-800">Action Required</h3>
							<div className="mt-2 text-sm text-amber-700">
								<ul className="list-disc list-inside space-y-1">
									{stats.outOfStock > 0 && <li>{stats.outOfStock} products are completely out of stock</li>}
									{stats.lowStock > 0 && <li>{stats.lowStock} products have low stock levels (≤10 units)</li>}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default StoreKeeperDashboard;
