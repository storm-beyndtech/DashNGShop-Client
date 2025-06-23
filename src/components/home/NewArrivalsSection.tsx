import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import ProductGrid from "../products/ProductGrid";
import { useAppSelector } from "@/redux/hooks";
import { selectNewProducts, selectProductError, selectProductLoading } from "@/redux/selectors/productsSelectors";

interface newProductsSectionProps {
	className?: string;
}

const newProductsSection = ({ className = "" }: newProductsSectionProps) => {
	const newProductsRef = useRef(null);
	const isnewProductsInView = useInView(newProductsRef, { once: true, margin: "-100px" });
  const newProducts = useAppSelector(selectNewProducts);
  const isLoading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);


	if (error) {
		return (
			<section className={`py-20 ${className}`}>
				<div className="container">
					<div className="text-center">
						<h3 className="text-xl font-semibold text-neutral-900 mb-2">Unable to load new arrivals</h3>
						<p className="text-neutral-600">{error}</p>
					</div>
				</div>
			</section>
		);
	}

	if (newProducts.length === 0 && !isLoading) {
		return (
			<section className={`py-20 ${className}`}>
				<div className="container">
					<div className="text-center">
						<h3 className="text-xl font-semibold text-neutral-900 mb-2">No new arrivals available</h3>
						<p className="text-neutral-600">Check back soon for new products!</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<motion.section
			ref={newProductsRef}
			initial={{ opacity: 0 }}
			animate={isnewProductsInView ? { opacity: 1 } : {}}
			transition={{ duration: 0.8 }}
			className={`py-20 bg-white ${className}`}
		>
			<div className="container">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isnewProductsInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-center mb-16"
				>
					<div className="flex items-center justify-center gap-3 mb-4">
						<motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
							<Sparkles className="w-6 h-6 text-emerald-500" />
						</motion.div>
						<span className="text-sm font-medium text-neutral-600 tracking-wider uppercase">
							Fresh Arrivals
						</span>
						<motion.div
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
						>
							<Zap className="w-6 h-6 text-emerald-500" />
						</motion.div>
					</div>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
						<span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
							New
						</span>{" "}
						<span className="text-neutral-900">Arrivals</span>
					</h2>
					<p className="text-xl text-neutral-600 max-w-2xl mx-auto">
						Be the first to discover our latest premium additions
					</p>
				</motion.div>

				{/* New Arrivals Grid using ProductGrid */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={isnewProductsInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mb-16"
				>
					<ProductGrid products={newProducts.slice(0, 8)} loading={isLoading} viewMode="grid" />
				</motion.div>

				{/* CTA Button */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isnewProductsInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 1.4 }}
					className="text-center"
				>
					<Link
						to="/products"
						className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 py-3 rounded-xl font-medium shadow hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 hover:scale-105"
					>
						<Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
						Shop All Products
						<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
					</Link>
				</motion.div>
			</div>
		</motion.section>
	);
};

export default newProductsSection;
