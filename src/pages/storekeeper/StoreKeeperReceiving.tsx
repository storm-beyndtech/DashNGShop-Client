// pages/storekeeper/StoreKeeperReceiving.tsx
import { useState } from "react";
import { Truck, Package, CheckCircle, Clock } from "lucide-react";

const StoreKeeperReceiving = () => {
	const [shipments] = useState([
		{
			id: "SH-2024-001",
			supplier: "Tech Distribution Ltd",
			status: "pending",
			expectedDate: "2024-01-22",
			items: 50,
			value: 2500000,
		},
		{
			id: "SH-2024-002",
			supplier: "Mobile World Inc",
			status: "received",
			expectedDate: "2024-01-20",
			receivedDate: "2024-01-20",
			items: 30,
			value: 1800000,
		},
	]);

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "pending":
				return <Clock className="w-4 h-4 text-yellow-600" />;
			case "received":
				return <CheckCircle className="w-4 h-4 text-green-600" />;
			default:
				return <Package className="w-4 h-4 text-gray-600" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "received":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">Receiving</h1>
				<button className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
					<Package className="w-4 h-4" />
					<span>Receive Shipment</span>
				</button>
			</div>

			{/* Shipments */}
			<div className="space-y-4">
				{shipments.map((shipment) => (
					<div key={shipment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center space-x-4">
								<div className="p-2 bg-orange-100 rounded-lg">
									<Truck className="w-6 h-6 text-orange-600" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-900">{shipment.id}</h3>
									<p className="text-sm text-gray-600">{shipment.supplier}</p>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								{getStatusIcon(shipment.status)}
								<span
									className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}
								>
									{shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
								</span>
							</div>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div>
								<p className="text-sm text-gray-600">Expected Date</p>
								<p className="font-medium">{new Date(shipment.expectedDate).toLocaleDateString()}</p>
							</div>
							{shipment.receivedDate && (
								<div>
									<p className="text-sm text-gray-600">Received Date</p>
									<p className="font-medium">{new Date(shipment.receivedDate).toLocaleDateString()}</p>
								</div>
							)}
							<div>
								<p className="text-sm text-gray-600">Items</p>
								<p className="font-medium">{shipment.items}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Value</p>
								<p className="font-medium">₦{shipment.value.toLocaleString()}</p>
							</div>
						</div>

						{shipment.status === "pending" && (
							<div className="mt-4 flex space-x-3">
								<button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
									Receive
								</button>
								<button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
									View Details
								</button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default StoreKeeperReceiving;
