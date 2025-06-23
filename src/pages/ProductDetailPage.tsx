import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Heart,
	Share2,
	Truck,
	Shield,
	RotateCcw,
	Star,
	ChevronLeft,
	ChevronRight,
	Minus,
	Plus,
	ShoppingBag,
	Loader2,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Button from "../components/ui/Button";
import { Product } from "@/data/types";

const ProductDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const { addItem } = useCart();

	const [product, setProduct] = useState<Product | null>(null);
	const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isPageLoading, setIsPageLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Get base URL from environment
	const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

	// Fetch product data
	useEffect(() => {
		const fetchProduct = async () => {
			if (!id) return;

			try {
				setIsPageLoading(true);
				setError(null);

				const response = await fetch(`${baseUrl}/products/${id}`);

				if (!response.ok) {
					if (response.status === 404) {
						setError("Product not found");
					} else {
						throw new Error(`Failed to fetch product: ${response.status}`);
					}
					return;
				}

				const data = await response.json();
				const productData = data.product || data;

				setProduct(productData);

				// Set default selections
				if (productData.sizes && productData.sizes.length > 0) {
					setSelectedSize(productData.sizes[0]);
				}
				if (productData.colors && productData.colors.length > 0) {
					setSelectedColor(productData.colors[0]);
				}

				// Reset selected image to 0 for new product
				setSelectedImage(0);

				// Fetch related products
				if (productData.category) {
					fetchRelatedProducts(productData.category, productData.id);
				}
			} catch (err) {
				console.error("Error fetching product:", err);
				setError(err instanceof Error ? err.message : "Failed to load product");
			} finally {
				setIsPageLoading(false);
			}
		};

		fetchProduct();
	}, [id, baseUrl]);

	// Fetch related products
	const fetchRelatedProducts = async (category: string, currentProductId: string) => {
		try {
			const response = await fetch(
				`${baseUrl}/products?category=${encodeURIComponent(category)}&limit=4&exclude=${currentProductId}`,
			);

			if (response.ok) {
				const data = await response.json();
				const relatedData = data.products || data || [];
				setRelatedProducts(relatedData.filter((p: Product) => p.id !== currentProductId).slice(0, 4));
			}
		} catch (err) {
			console.error("Error fetching related products:", err);
			// Non-critical error, just log it
		}
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0,
		}).format(price);
	};

	const handleAddToCart = () => {
		if (!product || !selectedSize || !selectedColor || !product.images || product.images.length === 0) return;

		setIsLoading(true);

		// Simulate API delay
		setTimeout(() => {
			addItem({
				productId: product.id,
				name: product.name,
				price: product.price,
				image: product.images[selectedImage] || product.images[0],
				size: selectedSize,
				color: selectedColor,
				maxStock: product.stockCount,
				quantity,
			});
			setIsLoading(false);
		}, 500);
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: product?.name,
					text: product?.description,
					url: window.location.href,
				});
			} catch (error) {
				console.log("Error sharing:", error);
			}
		} else {
			// Fallback: copy URL to clipboard
			navigator.clipboard.writeText(window.location.href);
		}
	};

	// Early return for loading and error states to prevent rendering with null product
	if (isPageLoading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="w-8 h-8 animate-spin text-neutral-600 mx-auto mb-4" />
					<p className="text-neutral-600">Loading product...</p>
				</div>
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className="min-h-screen bg-neutral-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-serif font-bold text-neutral-900 mb-4">
						{error === "Product not found" ? "Product Not Found" : "Error Loading Product"}
					</h1>
					<p className="text-neutral-600 mb-6">
						{error === "Product not found"
							? "The product you're looking for doesn't exist."
							: error || "Something went wrong while loading the product."}
					</p>
					<div className="space-x-4">
						<Link to="/products" className="btn-primary">
							Back to Products
						</Link>
						{error !== "Product not found" && (
							<button onClick={() => window.location.reload()} className="btn-secondary">
								Try Again
							</button>
						)}
					</div>
				</div>
			</div>
		);
	}

	// Additional safety check - ensure product has required properties
	if (!product.images || product.images.length === 0) {
		return (
			<div className="min-h-screen bg-neutral-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Invalid Product Data</h1>
					<p className="text-neutral-600 mb-6">This product is missing required information.</p>
					<Link to="/products" className="btn-primary">
						Back to Products
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Breadcrumb */}
			<div className="container py-4">
				<nav className="flex items-center space-x-2 text-sm text-neutral-600">
					<Link to="/" className="hover:text-neutral-900 transition-colors">
						Home
					</Link>
					<span>/</span>
					<Link to="/products" className="hover:text-neutral-900 transition-colors">
						Products
					</Link>
					<span>/</span>
					<Link
						to={`/products?category=${encodeURIComponent(product.category)}`}
						className="hover:text-neutral-900 transition-colors"
					>
						{product.category}
					</Link>
					<span>/</span>
					<span className="text-neutral-900">{product.name}</span>
				</nav>
			</div>

			<div className="container pb-16">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Product Images */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
					>
						{/* Main Image */}
						<div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-neutral-100">
							<img
								src={product.images[selectedImage] || product.images[0]}
								alt={product.name}
								className="w-full h-full object-cover"
								onError={(e) => {
									// Fallback for broken images
									e.currentTarget.src = "/placeholder-image.jpg";
								}}
							/>

							{/* Image Navigation */}
							{product.images.length > 1 && (
								<>
									<button
										onClick={() =>
											setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
										}
										className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
									>
										<ChevronLeft className="w-5 h-5" />
									</button>
									<button
										onClick={() =>
											setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
										}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
									>
										<ChevronRight className="w-5 h-5" />
									</button>
								</>
							)}

							{/* Badges */}
							<div className="absolute top-4 left-4 flex flex-col gap-2">
								{product.isNewProduct && (
									<span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
										New
									</span>
								)}
								{product.originalPrice && (
									<span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
										Sale
									</span>
								)}
							</div>
						</div>

						{/* Thumbnail Images */}
						{product.images.length > 1 && (
							<div className="grid grid-cols-4 gap-2">
								{product.images.map((image, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
											selectedImage === index
												? "border-neutral-900"
												: "border-neutral-200 hover:border-neutral-300"
										}`}
									>
										<img
											src={image}
											alt={`${product.name} ${index + 1}`}
											className="w-full h-full object-cover"
										/>
									</button>
								))}
							</div>
						)}
					</motion.div>

					{/* Product Info */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-6"
					>
						{/* Header */}
						<div>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-primary-600 font-medium">{product.category}</span>
								<div className="flex items-center space-x-2">
									<button
										onClick={() => setIsWishlisted(!isWishlisted)}
										className={`p-2 rounded-full transition-colors ${
											isWishlisted
												? "bg-red-100 text-red-600"
												: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
										}`}
									>
										<Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
									</button>
									<button
										onClick={handleShare}
										className="p-2 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-full transition-colors"
									>
										<Share2 className="w-5 h-5" />
									</button>
								</div>
							</div>

							<h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">{product.name}</h1>

							<div className="flex items-center space-x-4 mb-4">
								<div className="flex items-center">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className={`w-4 h-4 ${
												i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-neutral-300"
											}`}
										/>
									))}
									<span className="ml-2 text-sm text-neutral-600">
										{product.rating} ({product.reviewCount} reviews)
									</span>
								</div>
							</div>

							<div className="flex items-center space-x-3">
								<span className="text-2xl font-bold text-neutral-900">{formatPrice(product.price)}</span>
								{product.originalPrice && (
									<span className="text-lg text-neutral-500 line-through">
										{formatPrice(product.originalPrice)}
									</span>
								)}
								{product.originalPrice && (
									<span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
										Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
									</span>
								)}
							</div>
						</div>

						{/* Description */}
						<div className="prose prose-neutral max-w-none">
							<p className="text-neutral-600 leading-relaxed">{product.description}</p>
						</div>

						{/* Features */}
						{product.features && product.features.length > 0 && (
							<div>
								<h3 className="font-medium text-neutral-900 mb-3">Key Features</h3>
								<ul className="space-y-1">
									{product.features.map((feature, index) => (
										<li key={index} className="text-sm text-neutral-600 flex items-center">
											<span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2" />
											{feature}
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Size Selection */}
						{product.sizes && product.sizes.length > 0 && (
							<div>
								<h3 className="font-medium text-neutral-900 mb-3">Size</h3>
								<div className="flex flex-wrap gap-2">
									{product.sizes.map((size) => (
										<button
											key={size}
											onClick={() => setSelectedSize(size)}
											className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
												selectedSize === size
													? "border-neutral-900 bg-neutral-900 text-white"
													: "border-neutral-300 hover:border-neutral-400"
											}`}
										>
											{size}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Color Selection */}
						{product.colors && product.colors.length > 0 && (
							<div>
								<h3 className="font-medium text-neutral-900 mb-3">Color: {selectedColor}</h3>
								<div className="flex flex-wrap gap-2">
									{product.colors.map((color) => (
										<button
											key={color}
											onClick={() => setSelectedColor(color)}
											className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
												selectedColor === color
													? "border-neutral-900 bg-neutral-900 text-white"
													: "border-neutral-300 hover:border-neutral-400"
											}`}
										>
											{color}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Quantity */}
						<div>
							<h3 className="font-medium text-neutral-900 mb-3">Quantity</h3>
							<div className="flex items-center space-x-3">
								<div className="flex items-center border border-neutral-300 rounded-md">
									<button
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										className="p-2 hover:bg-neutral-50 transition-colors"
									>
										<Minus className="w-4 h-4" />
									</button>
									<span className="px-4 py-2 font-medium">{quantity}</span>
									<button
										onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
										className="p-2 hover:bg-neutral-50 transition-colors"
									>
										<Plus className="w-4 h-4" />
									</button>
								</div>
								<span className="text-sm text-neutral-600">{product.stockCount} items available</span>
							</div>
						</div>

						{/* Add to Cart */}
						<div className="space-y-3">
							<Button
								onClick={handleAddToCart}
								disabled={!product.inStock || isLoading}
								isLoading={isLoading}
								className="w-full"
								size="lg"
							>
								<ShoppingBag className="w-5 h-5 mr-2" />
								{!product.inStock ? "Out of Stock" : "Add to Cart"}
							</Button>

							{product.stockCount <= 5 && product.inStock && (
								<p className="text-sm text-orange-600 text-center">
									Only {product.stockCount} left in stock!
								</p>
							)}
						</div>

						{/* Features */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
							<div className="flex items-center space-x-3">
								<Truck className="w-5 h-5 text-neutral-400" />
								<div>
									<p className="text-sm font-medium text-neutral-900">Free Shipping</p>
									<p className="text-xs text-neutral-600">On orders over ₦50,000</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<RotateCcw className="w-5 h-5 text-neutral-400" />
								<div>
									<p className="text-sm font-medium text-neutral-900">Easy Returns</p>
									<p className="text-xs text-neutral-600">30-day return policy</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<Shield className="w-5 h-5 text-neutral-400" />
								<div>
									<p className="text-sm font-medium text-neutral-900">Secure Payment</p>
									<p className="text-xs text-neutral-600">256-bit SSL encryption</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Related Products */}
				{relatedProducts.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="mt-20"
					>
						<h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8">You Might Also Like</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{relatedProducts.map((relatedProduct) => (
								<Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`} className="group">
									<div className="aspect-square mb-3 overflow-hidden rounded-lg bg-neutral-100">
										<img
											src={relatedProduct.images[0]}
											alt={relatedProduct.name}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
									<h3 className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
										{relatedProduct.name}
									</h3>
									<p className="text-neutral-600 font-medium">{formatPrice(relatedProduct.price)}</p>
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default ProductDetailPage;
