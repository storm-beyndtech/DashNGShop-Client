import { useState } from "react";
import { Download, BarChart3, TrendingUp, Users, ShoppingCart } from "lucide-react";

const AdminReports = () => {
	const [reportData] = useState({
		totalRevenue: 45600000,
		totalOrders: 3456,
		totalUsers: 1247,
		avgOrderValue: 13200,
	});

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">System Reports</h1>
				<button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
					<Download className="w-4 h-4" />
					<span>Export All Reports</span>
				</button>
			</div>

			{/* Report Summary */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-green-100 rounded-lg">
							<TrendingUp className="w-6 h-6 text-green-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">
								₦{(reportData.totalRevenue / 1000000).toFixed(1)}M
							</h3>
							<p className="text-sm text-gray-600">Total Revenue</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-blue-100 rounded-lg">
							<ShoppingCart className="w-6 h-6 text-blue-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">{reportData.totalOrders.toLocaleString()}</h3>
							<p className="text-sm text-gray-600">Total Orders</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-purple-100 rounded-lg">
							<Users className="w-6 h-6 text-purple-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">{reportData.totalUsers.toLocaleString()}</h3>
							<p className="text-sm text-gray-600">Total Users</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-orange-100 rounded-lg">
							<BarChart3 className="w-6 h-6 text-orange-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">
								₦{reportData.avgOrderValue.toLocaleString()}
							</h3>
							<p className="text-sm text-gray-600">Avg Order Value</p>
						</div>
					</div>
				</div>
			</div>

			{/* Report Categories */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
						<h3 className="font-medium text-gray-900">Sales Report</h3>
						<p className="text-sm text-gray-600 mt-1">Revenue and sales analytics</p>
					</button>

					<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
						<h3 className="font-medium text-gray-900">User Analytics</h3>
						<p className="text-sm text-gray-600 mt-1">User behavior and demographics</p>
					</button>

					<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
						<h3 className="font-medium text-gray-900">Inventory Report</h3>
						<p className="text-sm text-gray-600 mt-1">Stock levels and movements</p>
					</button>

					<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
						<h3 className="font-medium text-gray-900">Financial Report</h3>
						<p className="text-sm text-gray-600 mt-1">Revenue, expenses, and profit</p>
					</button>

					<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
						<h3 className="font-medium text-gray-900">System Performance</h3>
						<p className="text-sm text-gray-600 mt-1">Performance metrics and uptime</p>
					</button>

					<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
						<h3 className="font-medium text-gray-900">Security Report</h3>
						<p className="text-sm text-gray-600 mt-1">Security events and threats</p>
					</button>
				</div>
			</div>

			{/* Recent Reports */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="p-6 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
				</div>
				<div className="p-6">
					<div className="space-y-4">
						<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
							<div className="flex items-center space-x-3">
								<div className="p-2 bg-purple-100 rounded-lg">
									<BarChart3 className="w-5 h-5 text-purple-600" />
								</div>
								<div>
									<h3 className="font-medium text-gray-900">Monthly Sales Report - January 2024</h3>
									<p className="text-sm text-gray-600">Generated on Jan 20, 2024</p>
								</div>
							</div>
							<button className="text-purple-600 hover:text-purple-700 text-sm font-medium">Download</button>
						</div>

						<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
							<div className="flex items-center space-x-3">
								<div className="p-2 bg-blue-100 rounded-lg">
									<Users className="w-5 h-5 text-blue-600" />
								</div>
								<div>
									<h3 className="font-medium text-gray-900">User Analytics Report - Q4 2023</h3>
									<p className="text-sm text-gray-600">Generated on Jan 15, 2024</p>
								</div>
							</div>
							<button className="text-purple-600 hover:text-purple-700 text-sm font-medium">Download</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminReports;
