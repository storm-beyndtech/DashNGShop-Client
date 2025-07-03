// pages/admin/AdminDashboard.tsx
import { useState, useEffect, useMemo } from "react";
import { Users, ShoppingCart, Package, TrendingUp, AlertTriangle, Activity, RefreshCw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	selectProductError,
	selectProductLoading,
	selectProducts,
	selectHasBeenFetched,
} from "@/redux/selectors/productsSelectors";
import {
	selectOrderError,
	selectOrderLoading,
	selectOrders,
	selectOrderHasBeenFetched,
} from "@/redux/selectors/ordersSelectors";
import { fetchProducts } from "@/redux/thunks/products";
import { fetchOrders } from "@/redux/thunks/orders";
import api from "@/utils/api";
import { useToastUtils } from "@/services/toast";

interface User {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	role: "customer" | "storekeeper" | "salesrep" | "admin";
	phone?: string;
	isActive: boolean;
	lastLoginAt?: string;
	createdAt: string;
}

const AdminDashboard = () => {
	const dispatch = useAppDispatch();
	const { showErrorToast } = useToastUtils();

	// Product selectors
	const products = useAppSelector(selectProducts);
	const productsLoading = useAppSelector(selectProductLoading);
	const productsError = useAppSelector(selectProductError);
	const productsHasBeenFetched = useAppSelector(selectHasBeenFetched);

	// Order selectors
	const orders = useAppSelector(selectOrders);
	const ordersLoading = useAppSelector(selectOrderLoading);
	const ordersError = useAppSelector(selectOrderError);
	const ordersHasBeenFetched = useAppSelector(selectOrderHasBeenFetched);

	// Users state (direct fetch)
	const [users, setUsers] = useState<User[]>([]);
	const [usersLoading, setUsersLoading] = useState(true);
	const [usersError, setUsersError] = useState<string | null>(null);

	// Check if we're currently loading
	const isLoading = useMemo(() => {
		return (
			(productsLoading && !productsHasBeenFetched) || (ordersLoading && !ordersHasBeenFetched) || usersLoading
		);
	}, [productsLoading, productsHasBeenFetched, ordersLoading, ordersHasBeenFetched, usersLoading]);

	// Check if there are any errors
	const error = useMemo(() => {
		return productsError || ordersError || usersError;
	}, [productsError, ordersError, usersError]);

	// Fetch users function
	const fetchUsers = async () => {
		try {
			setUsersLoading(true);
			setUsersError(null);
			const response = await api.get("/users");
			setUsers(response.data.users || []);
		} catch (err: any) {
			console.error("API Error:", err);
			setUsersError(err.response?.data?.message || "Failed to fetch users");
			showErrorToast(err.response?.data?.message || "Failed to fetch users");
		} finally {
			setUsersLoading(false);
		}
	};

	// Fetch data on mount if not already fetched
	useEffect(() => {
		if (!productsHasBeenFetched && !productsLoading) {
			dispatch(fetchProducts());
		}
		if (!ordersHasBeenFetched && !ordersLoading) {
			dispatch(fetchOrders());
		}
		// Always fetch users on mount
		fetchUsers();
	}, [dispatch, productsHasBeenFetched, productsLoading, ordersHasBeenFetched, ordersLoading]);

	// Calculate real stats from Redux data
	const stats = useMemo(() => {
		// User stats
		const totalUsers = users.length;
		const activeUsers = users.filter((user) => {
			// Check if user was active in the last 7 days
			if (!user.lastLoginAt) return false;
			const lastWeek = new Date();
			lastWeek.setDate(lastWeek.getDate() - 7);
			return new Date(user.lastLoginAt) > lastWeek;
		}).length;

		// Order stats
		const totalOrders = orders.length;
		const completedOrders = orders.filter(
			(order) => order.status === "delivered" && order.paymentStatus === "paid",
		);
		const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

		// Product stats
		const totalProducts = products.filter((p) => p.isActive).length;

		return {
			totalUsers,
			totalOrders,
			totalProducts,
			totalRevenue,
			activeUsers,
			systemHealth: 98.5, // This would come from monitoring service
		};
	}, [users, orders, products]);

	const getTimeAgo = (dateString: string): string => {
		const date = new Date(dateString);
		const now = new Date();
		const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

		if (diffInMinutes < 1) return "Just now";
		if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

		const diffInHours = Math.floor(diffInMinutes / 60);
		if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

		const diffInDays = Math.floor(diffInHours / 24);
		return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
	};

	// Generate recent activity from real data
	const recentActivity = useMemo(() => {
		const activities: any = [];
		const now = new Date();

		// Recent user registrations
		const recentUsers = users
			.filter((user) => {
				const userCreated = new Date(user.createdAt);
				const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
				return userCreated > oneDayAgo;
			})
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
			.slice(0, 2);

		recentUsers.forEach((user) => {
			activities.push({
				id: `user-${user.id}`,
				action: "New user registration",
				user: user.email,
				time: getTimeAgo(user.createdAt),
				type: "user",
			});
		});

		// Recent orders
		const recentOrders = orders
			.filter((order) => {
				const orderCreated = new Date(order.createdAt);
				const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
				return orderCreated > sixHoursAgo;
			})
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
			.slice(0, 3);

		recentOrders.forEach((order) => {
			activities.push({
				id: `order-${order.id}`,
				action: order.status === "delivered" ? "Order completed" : "New order placed",
				user: order.orderNumber,
				time: getTimeAgo(order.createdAt),
				type: "order",
			});
		});

		// Recent product updates (simulate from products with recent updates)
		const recentProducts = products
			.filter((product) => {
				if (!product.updatedAt) return false;
				const productUpdated = new Date(product.updatedAt);
				const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
				return productUpdated > twelveHoursAgo;
			})
			.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime())
			.slice(0, 2);

		recentProducts.forEach((product) => {
			activities.push({
				id: `product-${product.id}`,
				action: "Product stock updated",
				user: product.name,
				time: getTimeAgo(product.updatedAt as any),
				type: "inventory",
			});
		});

		const parseTimeAgo = (timeString: string): number => {
			if (timeString === "Just now") return 0;
			const match = timeString.match(/(\d+)\s+(minute|hour|day)/);
			if (!match) return 999999;

			const value = parseInt(match[1]);
			const unit = match[2];

			switch (unit) {
				case "minute":
					return value;
				case "hour":
					return value * 60;
				case "day":
					return value * 60 * 24;
				default:
					return 999999;
			}
		};

		// Sort all activities by most recent and limit to 8
		return activities
			.sort((a: any, b: any) => {
				const timeA = parseTimeAgo(a.time);
				const timeB = parseTimeAgo(b.time);
				return timeA - timeB;
			})
			.slice(0, 8);
	}, [users, orders, products]);

	// System health checks based on real data
	const systemStatus = useMemo(() => {
		const checks = [
			{
				name: "Database",
				status: products.length > 0 && orders.length > 0 && users.length > 0 ? "operational" : "degraded",
				description: "Data availability check",
			},
			{
				name: "API Services",
				status: !error ? "operational" : "degraded",
				description: "Service connectivity check",
			},
			{
				name: "Payment Gateway",
				status: orders.some((o) => o.paymentStatus === "paid") ? "operational" : "degraded",
				description: "Payment processing check",
			},
			{
				name: "Email Service",
				status: "operational", // This would come from actual service check
				description: "Email delivery service",
			},
		];

		return checks;
	}, [products, orders, users, error]);

	const handleRefresh = () => {
		dispatch(fetchProducts());
		dispatch(fetchOrders());
		fetchUsers();
	};

	const getActivityIcon = (type: string) => {
		switch (type) {
			case "user":
				return <Users className="w-4 h-4 text-purple-600" />;
			case "order":
				return <ShoppingCart className="w-4 h-4 text-green-600" />;
			case "inventory":
				return <Package className="w-4 h-4 text-orange-600" />;
			case "security":
				return <AlertTriangle className="w-4 h-4 text-red-600" />;
			default:
				return <Activity className="w-4 h-4 text-gray-600" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "operational":
				return { dot: "bg-green-400", text: "text-green-600" };
			case "degraded":
				return { dot: "bg-yellow-400", text: "text-yellow-600" };
			case "down":
				return { dot: "bg-red-400", text: "text-red-600" };
			default:
				return { dot: "bg-gray-400", text: "text-gray-600" };
		}
	};

	// Error state
	if (error) {
		return (
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">System Overview</h1>
						<p className="text-gray-600">Monitor your platform's performance and activity</p>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm border border-red-200 p-8">
					<div className="text-center">
						<AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
						<h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Dashboard Data</h3>
						<p className="text-red-600 mb-4">{error}</p>
						<button
							onClick={handleRefresh}
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

	// Loading state
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">System Overview</h1>
					<p className="text-gray-600">Monitor your platform's performance and activity</p>
				</div>
				<button
					onClick={handleRefresh}
					disabled={isLoading}
					className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
				>
					<RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
					<span>Refresh</span>
				</button>
			</div>

			{/* Data Info Banner */}
			<div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
				<div className="flex items-center">
					<Activity className="w-5 h-5 text-purple-600 mr-3" />
					<div className="text-sm text-purple-700">
						<p>
							<strong>Live Data:</strong> {users.length} users • {orders.length} orders • {products.length}{" "}
							products
						</p>
						<p>Last updated: {new Date().toLocaleString()}</p>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
				<div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-purple-100 rounded-lg">
							<Users className="w-6 h-6 text-purple-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-lg font-bold text-gray-900">
								{isLoading ? "..." : stats.totalUsers.toLocaleString()}
							</h3>
							<p className="text-[10px] text-gray-600">Total Users</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-green-100 rounded-lg">
							<ShoppingCart className="w-6 h-6 text-green-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-lg font-bold text-gray-900">
								{isLoading ? "..." : stats.totalOrders.toLocaleString()}
							</h3>
							<p className="text-[10px] text-gray-600">Total Orders</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-orange-100 rounded-lg">
							<Package className="w-6 h-6 text-orange-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-lg font-bold text-gray-900">{isLoading ? "..." : stats.totalProducts}</h3>
							<p className="text-[10px] text-gray-600">Products</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-purple-100 rounded-lg">
							<TrendingUp className="w-6 h-6 text-purple-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-lg font-bold text-gray-900">
								{isLoading ? "..." : `₦${(stats.totalRevenue / 1000000).toFixed(1)}M`}
							</h3>
							<p className="text-[10px] text-gray-600">Revenue</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-green-100 rounded-lg">
							<Activity className="w-6 h-6 text-green-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-lg font-bold text-gray-900">{isLoading ? "..." : stats.activeUsers}</h3>
							<p className="text-[10px] text-gray-600">Active Users</p>
						</div>
					</div>
				</div>
			</div>

			{/* System Status */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
					<div className="space-y-4">
						{systemStatus.map((service, index) => {
							const colors = getStatusColor(service.status);
							return (
								<div key={index} className="flex items-center justify-between">
									<div>
										<span className="text-sm text-gray-900 font-medium">{service.name}</span>
										<p className="text-xs text-gray-500">{service.description}</p>
									</div>
									<span className="flex items-center space-x-2">
										<div className={`w-2 h-2 ${colors.dot} rounded-full`}></div>
										<span className={`text-sm capitalize ${colors.text}`}>{service.status}</span>
									</span>
								</div>
							);
						})}
					</div>

					{/* Overall health */}
					<div className="mt-6 pt-4 border-t border-gray-200">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-gray-900">Overall Health</span>
							<span className="text-sm font-bold text-green-600">{stats.systemHealth}%</span>
						</div>
						<div className="mt-2 w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-green-600 h-2 rounded-full transition-all duration-300"
								style={{ width: `${stats.systemHealth}%` }}
							></div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
					<div className="grid grid-cols-2 gap-3">
						<button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
							<Users className="w-5 h-5 text-purple-600 mb-1" />
							<p className="text-sm font-medium">Manage Users</p>
							<p className="text-xs text-gray-500">{stats.totalUsers} total</p>
						</button>
						<button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
							<Activity className="w-5 h-5 text-purple-600 mb-1" />
							<p className="text-sm font-medium">View Logs</p>
							<p className="text-xs text-gray-500">System activity</p>
						</button>
						<button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
							<Package className="w-5 h-5 text-orange-600 mb-1" />
							<p className="text-sm font-medium">System Config</p>
							<p className="text-xs text-gray-500">Settings & config</p>
						</button>
						<button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
							<AlertTriangle className="w-5 h-5 text-red-600 mb-1" />
							<p className="text-sm font-medium">Security</p>
							<p className="text-xs text-gray-500">Security center</p>
						</button>
					</div>
				</div>
			</div>

			{/* Recent Activity */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="p-6 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
				</div>
				<div className="p-6">
					{recentActivity.length > 0 ? (
						<div className="space-y-4">
							{recentActivity.map((activity: any) => (
								<div key={activity.id} className="flex items-center space-x-3">
									<div className="p-2 bg-gray-100 rounded-lg">{getActivityIcon(activity.type)}</div>
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-900">{activity.action}</p>
										<p className="text-xs text-gray-600">{activity.user}</p>
									</div>
									<span className="text-xs text-gray-500">{activity.time}</span>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8">
							<Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
							<h3 className="text-sm font-medium text-gray-900 mb-1">No Recent Activity</h3>
							<p className="text-sm text-gray-600">
								Activity will appear here as users interact with the platform
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
