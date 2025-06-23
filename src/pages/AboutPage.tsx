import { motion } from "framer-motion";
import { Award, Globe, Users, Heart } from "lucide-react";

const AboutPage = () => {
	const values = [
		{
			icon: Award,
			title: "Premium Quality",
			description:
				"We source only the finest materials and work with skilled artisans to ensure every piece meets our exacting standards.",
		},
		{
			icon: Globe,
			title: "Global Reach",
			description:
				"From Lagos to London, our curated collections reflect international fashion trends while celebrating local craftsmanship.",
		},
		{
			icon: Users,
			title: "Customer First",
			description:
				"Your satisfaction is our priority. We provide personalized service and support throughout your shopping journey.",
		},
		{
			icon: Heart,
			title: "Sustainable Fashion",
			description:
				"We believe in responsible fashion that respects both people and planet, supporting ethical manufacturing practices.",
		},
	];

	const milestones = [
		{
			year: "2020",
			title: "The Beginning",
			description: "DashNGShop was founded with a vision to democratize luxury fashion in Nigeria.",
		},
		{
			year: "2021",
			title: "First Collection",
			description: "Launched our inaugural collection featuring 50 carefully curated pieces.",
		},
		{
			year: "2022",
			title: "Rapid Growth",
			description: "Expanded to serve over 10,000 customers across West Africa.",
		},
		{
			year: "2023",
			title: "Premium Partners",
			description: "Established partnerships with leading international fashion houses.",
		},
		{
			year: "2024",
			title: "Digital Innovation",
			description: "Launched our advanced e-commerce platform with AI-powered recommendations.",
		},
	];

	const team = [
		{
			name: "Adaora Okafor",
			role: "Founder & CEO",
			image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=300&h=300&fit=crop&crop=face",
			bio: "Former fashion buyer with 15+ years experience in luxury retail.",
		},
		{
			name: "James Adeleke",
			role: "Creative Director",
			image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
			bio: "Award-winning designer specializing in contemporary African fashion.",
		},
		{
			name: "Fatima Hassan",
			role: "Head of Operations",
			image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
			bio: "Operations expert ensuring seamless customer experience and logistics.",
		},
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-primary-50 to-accent-50 py-24">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-3xl mx-auto text-center"
					>
						<h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
							Redefining African Luxury Fashion
						</h1>
						<p className="text-xl text-neutral-600 leading-relaxed mb-8">
							At DashNGShop, we believe that luxury should be accessible, sustainable, and deeply rooted in
							cultural appreciation. Our mission is to curate exceptional fashion experiences that celebrate
							individual style while honoring craftsmanship traditions.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Story Section */}
			<section className="section-padding">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl font-serif font-bold text-neutral-900 mb-6">Our Story</h2>
							<div className="space-y-4 text-neutral-600 leading-relaxed">
								<p>
									Founded in 2020 by fashion industry veteran Adaora Okafor, DashNGShop emerged from a simple
									yet powerful vision: to make luxury fashion accessible to the modern African consumer while
									supporting local and international artisans.
								</p>
								<p>
									What started as a small collection of carefully curated pieces has grown into Nigeria's
									premier destination for luxury fashion. We've built our reputation on three core principles:
									uncompromising quality, exceptional service, and cultural authenticity.
								</p>
								<p>
									Today, we serve thousands of customers across West Africa, offering everything from everyday
									elegance to statement pieces that turn heads. Each item in our collection is selected for
									its craftsmanship, design innovation, and ability to make our customers feel confident and
									beautiful.
								</p>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="grid grid-cols-2 gap-4"
						>
							<img
								src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop"
								alt="Fashion atelier"
								className="rounded-lg object-cover h-full"
							/>
							<div className="space-y-4">
								<img
									src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=190&fit=crop"
									alt="Fashion design"
									className="rounded-lg object-cover"
								/>
								<img
									src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=190&fit=crop"
									alt="Luxury fabrics"
									className="rounded-lg object-cover"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="section-padding bg-neutral-50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Our Values</h2>
						<p className="text-xl text-neutral-600 max-w-2xl mx-auto">
							The principles that guide everything we do and every decision we make
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{values.map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
							>
								<div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
									<value.icon className="w-6 h-6 text-primary-600" />
								</div>
								<h3 className="text-xl font-serif font-semibold text-neutral-900 mb-3">{value.title}</h3>
								<p className="text-neutral-600 leading-relaxed">{value.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className="section-padding">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Our Journey</h2>
						<p className="text-xl text-neutral-600 max-w-2xl mx-auto">
							Key milestones in our mission to transform fashion retail in Africa
						</p>
					</motion.div>

					<div className="max-w-4xl mx-auto">
						{milestones.map((milestone, index) => (
							<motion.div
								key={milestone.year}
								initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className={`flex items-center mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
							>
								<div className={`flex-1 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
									<div className={`${index % 2 === 0 ? "text-right" : "text-left"}`}>
										<div className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
											{milestone.year}
										</div>
										<h3 className="text-xl font-serif font-semibold text-neutral-900 mb-2">
											{milestone.title}
										</h3>
										<p className="text-neutral-600">{milestone.description}</p>
									</div>
								</div>

								<div className="w-4 h-4 bg-primary-600 rounded-full relative z-10">
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
								</div>

								<div className="flex-1"></div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="section-padding bg-neutral-50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Meet Our Team</h2>
						<p className="text-xl text-neutral-600 max-w-2xl mx-auto">
							The passionate individuals behind DashNGShop's success
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{team.map((member, index) => (
							<motion.div
								key={member.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
							>
								<div className="aspect-square overflow-hidden">
									<img
										src={member.image}
										alt={member.name}
										className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-serif font-semibold text-neutral-900 mb-1">{member.name}</h3>
									<p className="text-primary-600 font-medium mb-3">{member.role}</p>
									<p className="text-neutral-600 text-sm">{member.bio}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="section-padding bg-neutral-900 text-white">
				<div className="container">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{[
							{ number: "50K+", label: "Happy Customers" },
							{ number: "200+", label: "Premium Products" },
							{ number: "15+", label: "Partner Brands" },
							{ number: "98%", label: "Satisfaction Rate" },
						].map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="text-center"
							>
								<div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
								<div className="text-neutral-300">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="section-padding">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center max-w-2xl mx-auto"
					>
						<h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
							Join Our Fashion Community
						</h2>
						<p className="text-xl text-neutral-600 mb-8">
							Experience the perfect blend of luxury, quality, and African elegance. Start your fashion
							journey with us today.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a href="/products" className="btn-primary">
								Shop Our Collection
							</a>
							<a href="/support" className="btn-secondary">
								Get in Touch
							</a>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default AboutPage;
