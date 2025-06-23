// pages/admin/AdminLogs.tsx
import { useState } from "react";
import { Activity, Download, Search } from "lucide-react";

const AdminLogs = () => {
	const [logs] = useState([
		{
			id: "1",
			timestamp: "2024-01-20T10:30:15Z",
			level: "info",
			category: "auth",
			message: "User login successful",
			user: "john.doe@example.com",
			ip: "192.168.1.100",
		},
		{
			id: "2",
			timestamp: "2024-01-20T10:25:43Z",
			level: "error",
			category: "payment",
			message: "Payment processing failed",
			user: "jane.smith@example.com",
			ip: "10.0.0.45",
		},
		{
			id: "3",
			timestamp: "2024-01-20T10:20:12Z",
			level: "warning",
			category: "inventory",
			message: "Low stock alert triggered",
			user: "system",
			ip: "internal",
		},
		{
			id: "4",
			timestamp: "2024-01-20T10:15:33Z",
			level: "info",
			category: "order",
			message: "New order created",
			user: "mike.johnson@example.com",
			ip: "172.16.0.25",
		},
	]);

	const getLevelColor = (level: string) => {
		switch (level) {
			case "error":
				return "bg-red-100 text-red-800";
			case "warning":
				return "bg-yellow-100 text-yellow-800";
			case "info":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
				<button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
					<Download className="w-4 h-4" />
					<span>Export Logs</span>
				</button>
			</div>

			{/* Filters */}
			<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="flex-1">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								type="text"
								placeholder="Search logs..."
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
							/>
						</div>
					</div>
					<select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500">
						<option value="">All Levels</option>
						<option value="error">Error</option>
						<option value="warning">Warning</option>
						<option value="info">Info</option>
					</select>
					<select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500">
						<option value="">All Categories</option>
						<option value="auth">Authentication</option>
						<option value="payment">Payment</option>
						<option value="inventory">Inventory</option>
						<option value="order">Orders</option>
					</select>
					<input
						type="date"
						className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
					/>
				</div>
			</div>

			{/* Logs Table */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									IP Address
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{logs.map((log) => (
								<tr key={log.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 text-sm text-gray-600">
										{new Date(log.timestamp).toLocaleString()}
									</td>
									<td className="px-6 py-4">
										<span
											className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(log.level)}`}
										>
											{log.level.toUpperCase()}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-900 capitalize">{log.category}</td>
									<td className="px-6 py-4 text-sm text-gray-900">{log.message}</td>
									<td className="px-6 py-4 text-sm text-gray-900">{log.user}</td>
									<td className="px-6 py-4 text-sm text-gray-900">{log.ip}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Log Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-red-100 rounded-lg">
							<Activity className="w-6 h-6 text-red-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">
								{logs.filter((log) => log.level === "error").length}
							</h3>
							<p className="text-sm text-gray-600">Errors Today</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-yellow-100 rounded-lg">
							<Activity className="w-6 h-6 text-yellow-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">
								{logs.filter((log) => log.level === "warning").length}
							</h3>
							<p className="text-sm text-gray-600">Warnings Today</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-blue-100 rounded-lg">
							<Activity className="w-6 h-6 text-blue-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">
								{logs.filter((log) => log.level === "info").length}
							</h3>
							<p className="text-sm text-gray-600">Info Logs Today</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-purple-100 rounded-lg">
							<Activity className="w-6 h-6 text-purple-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">{logs.length}</h3>
							<p className="text-sm text-gray-600">Total Logs Today</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLogs;
