// pages/admin/AdminSecurity.tsx
import { useState } from "react";
import { Shield, AlertTriangle, Eye, Lock, Activity } from "lucide-react";

const AdminSecurity = () => {
	const [securityEvents] = useState([
		{
			id: "1",
			type: "login_failure",
			user: "unknown@example.com",
			ip: "192.168.1.100",
			timestamp: "2024-01-20T10:30:00Z",
			severity: "medium",
		},
		{
			id: "2",
			type: "suspicious_activity",
			user: "john.doe@example.com",
			ip: "10.0.0.45",
			timestamp: "2024-01-20T09:15:00Z",
			severity: "high",
		},
		{
			id: "3",
			type: "password_change",
			user: "jane.smith@example.com",
			ip: "192.168.1.50",
			timestamp: "2024-01-19T16:20:00Z",
			severity: "low",
		},
	]);

	const getSeverityColor = (severity: string) => {
		switch (severity) {
			case "high":
				return "bg-red-100 text-red-800";
			case "medium":
				return "bg-yellow-100 text-yellow-800";
			case "low":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getEventIcon = (type: string) => {
		switch (type) {
			case "login_failure":
				return <Lock className="w-4 h-4 text-red-600" />;
			case "suspicious_activity":
				return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
			case "password_change":
				return <Shield className="w-4 h-4 text-green-600" />;
			default:
				return <Activity className="w-4 h-4 text-gray-600" />;
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-gray-900">Security Center</h1>
				<p className="text-gray-600">Monitor and manage system security</p>
			</div>

			{/* Security Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-red-100 rounded-lg">
							<AlertTriangle className="w-6 h-6 text-red-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">5</h3>
							<p className="text-sm text-gray-600">Security Alerts</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-yellow-100 rounded-lg">
							<Lock className="w-6 h-6 text-yellow-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">23</h3>
							<p className="text-sm text-gray-600">Failed Logins</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-blue-100 rounded-lg">
							<Eye className="w-6 h-6 text-blue-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">156</h3>
							<p className="text-sm text-gray-600">Active Sessions</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-green-100 rounded-lg">
							<Shield className="w-6 h-6 text-green-600" />
						</div>
						<div className="ml-4">
							<h3 className="text-2xl font-bold text-gray-900">98.5%</h3>
							<p className="text-sm text-gray-600">Security Score</p>
						</div>
					</div>
				</div>
			</div>

			{/* Security Events */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="p-6 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">Recent Security Events</h2>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									IP Address
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{securityEvents.map((event) => (
								<tr key={event.id} className="hover:bg-gray-50">
									<td className="px-6 py-4">
										<div className="flex items-center">
											<div className="p-2 bg-gray-100 rounded-lg mr-3">{getEventIcon(event.type)}</div>
											<span className="text-sm font-medium text-gray-900 capitalize">
												{event.type.replace("_", " ")}
											</span>
										</div>
									</td>
									<td className="px-6 py-4 text-sm text-gray-900">{event.user}</td>
									<td className="px-6 py-4 text-sm text-gray-900">{event.ip}</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{new Date(event.timestamp).toLocaleString()}
									</td>
									<td className="px-6 py-4">
										<span
											className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(
												event.severity,
											)}`}
										>
											{event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Security Recommendations */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Security Recommendations</h2>
				<div className="space-y-4">
					<div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
						<AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
						<div>
							<h3 className="text-sm font-medium text-yellow-800">Enable Two-Factor Authentication</h3>
							<p className="text-sm text-yellow-700">
								Require 2FA for all admin accounts to improve security.
							</p>
						</div>
					</div>

					<div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
						<Shield className="w-5 h-5 text-blue-600 mt-0.5" />
						<div>
							<h3 className="text-sm font-medium text-blue-800">Update SSL Certificates</h3>
							<p className="text-sm text-blue-700">
								SSL certificate expires in 30 days. Renew to maintain secure connections.
							</p>
						</div>
					</div>

					<div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
						<Lock className="w-5 h-5 text-green-600 mt-0.5" />
						<div>
							<h3 className="text-sm font-medium text-green-800">Strong Password Policy</h3>
							<p className="text-sm text-green-700">Current password policy meets security requirements.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminSecurity;
