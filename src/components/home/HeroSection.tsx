import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroImage1 from "../../assets/hero-assets/Elegant-Woman-in-Black-Hat.jpeg";
import heroImage2 from "../../assets/hero-assets/Minimalist-Fashion-Pose.jpeg";
import heroImage3 from "../../assets/hero-assets/Ornate-Jewelry-Close-Up.jpeg";

const HeroSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	// Placeholder images - replace with your actual images
	const heroImages = [heroImage1, heroImage2, heroImage3];

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % heroImages.length);
		}, 4000);
		return () => clearInterval(timer);
	}, [heroImages.length]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % heroImages.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
	};

	return (
		<section className="relative min-h-screen py-10 flex items-center bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
			<div className="absolute inset-0 bg-black/5"></div>

			<div className="container relative z-10 h-full">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
					{/* Left Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-5"
					>
						<motion.p
							className="max-sm:text-sm text-neutral-600 leading-relaxed max-w-lg"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							Discover our curated collection—
							<br />
							luxury and sophistication in every thread.
						</motion.p>

						<motion.h1
							className="text-5xl md:text-6xl lg:text-8xl font-serif font-bold leading-tight"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							Next Level
							<span className="block text-primary-800 mt-2">Style Reveal</span>
						</motion.h1>

						<motion.div
							className="flex flex-col sm:flex-row gap-4 pt-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
						>
							<Link
								to="/products"
								className="bg-primary-200 hover:bg-primary-900 text-primary-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
							>
								Explore Collection
								<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								to="/new-arrivals"
								className="border border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
							>
								New Arrivals
							</Link>
						</motion.div>

						{/* Social Proof */}
						<motion.div
							className="flex items-center gap-6 pt-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
						>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary-600">50K+</div>
								<div className="text-sm text-neutral-500">Customers</div>
							</div>
							<div className="w-px h-12 bg-neutral-300"></div>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary-600">4.9★</div>
								<div className="text-sm text-neutral-500">Rating</div>
							</div>
							<div className="w-px h-12 bg-neutral-300"></div>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary-600">200+</div>
								<div className="text-sm text-neutral-500">Products</div>
							</div>
						</motion.div>
					</motion.div>

					{/* Right Image Carousel */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="relative h-full flex items-center"
					>
						<div className="relative w-full max-w-lg mx-auto">
							{/* Main Carousel Container */}
							<div className="relative h-96 md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
								<AnimatePresence mode="wait">
									<motion.img
										key={currentSlide}
										src={heroImages[currentSlide]}
										alt={`Fashion showcase ${currentSlide + 1}`}
										className="absolute inset-0 w-full h-full object-cover"
										initial={{ opacity: 0, scale: 1.1 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										transition={{ duration: 0.7 }}
									/>
								</AnimatePresence>

								{/* Overlay Gradient */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

								{/* Navigation Arrows */}
								<button
									onClick={prevSlide}
									className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-200/70 hover:bg-primary-100 p-4 rounded-full shadow-lg transition-all duration-300 z-10"
								>
									<ChevronLeft className="w-5 h-5 text-primary-900" />
								</button>
								<button
									onClick={nextSlide}
									className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-200/70 hover:bg-primary-100 p-4 rounded-full shadow-lg transition-all duration-300 z-10"
								>
									<ChevronRight className="w-5 h-5 text-primary-900" />
								</button>
							</div>

							{/* Slide Indicators */}
							<div className="flex justify-center gap-2 mt-6">
								{heroImages.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentSlide(index)}
										className={`w-3 h-3 rounded-full transition-all duration-300 ${
											index === currentSlide ? "bg-primary-600 w-8" : "bg-neutral-300 hover:bg-neutral-400"
										}`}
									/>
								))}
							</div>

							{/* Floating Accent Elements */}
							<motion.div
								className="absolute -top-7 -right-7 w-24 h-24 bg-primary-200 rounded-full opacity-50 glass"
								animate={{
									rotate: [0, 360],
									scale: [1, 1.1, 1],
								}}
								transition={{
									duration: 8,
									repeat: Infinity,
									ease: "linear",
								}}
							/>
							<motion.div
								className="absolute -bottom-5 -left-5 w-16 h-16 bg-accent-200 rounded-full opacity-50 glass"
								animate={{
									rotate: [360, 0],
									scale: [1, 1.2, 1],
								}}
								transition={{
									duration: 6,
									repeat: Infinity,
									ease: "linear",
								}}
							/>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Background Floating Elements */}
			<motion.div
				className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full opacity-10"
				animate={{ y: [0, -30, 0] }}
				transition={{ duration: 6, repeat: Infinity }}
			/>
			<motion.div
				className="absolute bottom-20 right-20 w-24 h-24 bg-accent-200 rounded-full opacity-15"
				animate={{ y: [0, 20, 0] }}
				transition={{ duration: 4, repeat: Infinity }}
			/>
		</section>
	);
};

export default HeroSection;
