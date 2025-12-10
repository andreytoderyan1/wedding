<script lang="ts">
	import { ArrowLeft, Star, CheckCircle, Zap, Shield, Award, Home, Users, Clock, ArrowRight } from '@lucide/svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ServiceForm from '../../components/ServiceForm.svelte';
	import { BATHROOM_SERVICE_TYPES } from '$lib/constants/services.js';

	const goBack = () => {
		window.history.back();
	};

	const bathroomServices = [
		{
			title: 'Bathroom Remodeling',
			description: 'Complete bathroom transformations with modern designs and fixtures',
			features: ['Custom Design', 'Premium Fixtures', 'Tile Installation', 'Professional Installation'],
			icon: Award,
			color: 'bg-emerald-50 border-emerald-200'
		},
		{
			title: 'Bathroom Repair',
			description: 'Fix leaks, damaged tiles, and malfunctioning fixtures',
			features: ['Leak Repair', 'Tile Replacement', 'Fixture Repair', 'Plumbing Fixes'],
			icon: Shield,
			color: 'bg-teal-50 border-teal-200'
		},
		{
			title: 'Luxury Bathroom Upgrades',
			description: 'Upgrade to luxury bathrooms that enhance comfort and value',
			features: ['Walk-in Showers', 'Freestanding Tubs', 'Heated Floors', 'Smart Fixtures'],
			icon: Zap,
			color: 'bg-cyan-50 border-cyan-200'
		},
		{
			title: 'Custom Bathroom Design',
			description: 'Design and install custom bathrooms for unique spaces',
			features: ['Custom Layouts', 'Specialty Materials', 'Architectural Design', 'Premium Finishes'],
			icon: Award,
			color: 'bg-green-50 border-green-200'
		}
	];

	const benefits = [
		{
			title: 'Increased Home Value Up to 60%',
			description: 'Bathroom remodels offer excellent return on investment',
			icon: Award
		},
		{
			title: 'Improved Daily Comfort',
			description: 'Enjoy a luxurious bathroom experience every day',
			icon: Home
		},
		{
			title: 'Enhanced Functionality',
			description: 'Better storage, lighting, and space utilization',
			icon: Zap
		},
		{
			title: 'Better Water Efficiency',
			description: 'Modern fixtures reduce water consumption',
			icon: Shield
		},
		{
			title: 'Modern Aesthetics',
			description: 'Transform your bathroom with contemporary designs',
			icon: Star
		},
		{
			title: 'Professional Installation',
			description: 'Expert craftsmanship with comprehensive warranties',
			icon: CheckCircle
		}
	];

	const stats = [
		{ value: '15+', label: 'Years Experience', icon: Award },
		{ value: '12,000+', label: 'Bathrooms Remodeled', icon: Users },
		{ value: '60%', label: 'Value Increase', icon: Award },
		{ value: '4.9★', label: 'Average Rating', icon: Star }
	];
</script>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<header class="bg-white px-4 py-4 shadow-sm border-b border-gray-100">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="flex items-center">
				<button onclick={goBack} class="mr-4 flex items-center text-emerald-600 hover:text-emerald-800 transition-colors">
					<ArrowLeft class="mr-2 h-5 w-5" />
					Back
				</button>
				<img src="/HomeQuote.png" alt="HomeQuote Logo" class="h-10" />
			</div>
		</div>
	</header>

	<!-- Premium Hero Section -->
	<section class="relative overflow-hidden bg-linear-to-b from-white via-emerald-50/30 to-white py-24 lg:py-32">
		<!-- Background Image -->
		<div class="absolute inset-0">
			<img
				src="/bathroom-hero.jpg"
				alt="Modern Luxury Bathroom"
				class="h-full w-full object-cover opacity-100"
			/>
			<div class="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-white/70"></div>
		</div>
		<div class="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-2xl bg-white/80 backdrop-blur-md p-8 shadow-2xl sm:p-10">
				<div class="text-center">
					<div class="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 shadow-lg">
						<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
						<span>Luxury Bathroom Specialists</span>
					</div>
					<h1 class="mb-6 text-5xl font-extrabold leading-tight text-gray-900 sm:text-6xl lg:text-7xl">
						Expert Bathroom Services
						<br />
						<span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">For Your Home</span>
					</h1>
					<p class="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-700">
						Transform your bathroom with modern designs and quality fixtures. From remodeling to repair, we provide comprehensive bathroom solutions that enhance comfort and value.
					</p>
					
					<!-- Trust Indicators -->
					<div class="flex flex-wrap items-center justify-center gap-6 text-sm mb-8">
						<div class="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 shadow-sm">
							<CheckCircle class="h-5 w-5 text-green-600" />
							<span class="font-medium text-gray-900">Licensed & Insured</span>
						</div>
						<div class="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 shadow-sm">
							<CheckCircle class="h-5 w-5 text-green-600" />
							<span class="font-medium text-gray-900">15+ Years Experience</span>
						</div>
						<div class="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 shadow-sm">
							<CheckCircle class="h-5 w-5 text-green-600" />
							<span class="font-medium text-gray-900">4.9★ Average Rating</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Bar -->
	<section class="border-y border-gray-100 bg-gray-50 py-12">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
				{#each stats as stat}
					{@const Icon = stat.icon}
					<div class="text-center">
						<div class="mb-2 flex justify-center">
							<div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
								<Icon class="h-6 w-6 text-emerald-600" />
							</div>
						</div>
						<div class="text-3xl font-bold text-gray-900">{stat.value}</div>
						<div class="text-sm text-gray-600">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Find Contractor Section -->
	<section class="bg-white py-16">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 shadow-xl sm:p-12">
				<h2 class="mb-6 text-center text-3xl font-bold text-white sm:text-4xl">
					Find a Verified Contractor in Minutes
				</h2>
				<div class="mx-auto max-w-2xl">
					<ServiceForm serviceType={BATHROOM_SERVICE_TYPES} thumbtackUrl="https://www.thumbtack.com/k/bathroom-remodeling/near-me" />
				</div>
			</div>
		</div>
	</section>

	<!-- Services Grid -->
	<section id="services" class="py-20">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
					Complete Bathroom Solutions
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					From modern remodeling to custom designs, our expert team provides comprehensive bathroom services for your home.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				{#each bathroomServices as service}
					{@const Icon = service.icon}
					<div class="group relative overflow-hidden rounded-2xl border-2 {service.color} p-8 transition-all hover:shadow-xl hover:scale-[1.02]">
						<div class="relative mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
							<Icon class="h-7 w-7 text-emerald-600" />
						</div>
						<h3 class="mb-3 text-2xl font-bold text-gray-900">{service.title}</h3>
						<p class="mb-6 text-gray-700">{service.description}</p>
						<ul class="space-y-3">
							{#each service.features as feature}
								<li class="flex items-center gap-2 text-gray-700">
									<CheckCircle class="h-5 w-5 shrink-0 text-green-500" />
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Benefits Section -->
	<section class="bg-gray-50 py-20">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
					Why Choose Our Bathroom Services?
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					We're committed to providing exceptional service and lasting solutions for your home.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each benefits as benefit}
					{@const Icon = benefit.icon}
					<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-emerald-200">
						<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
							<Icon class="h-6 w-6 text-emerald-600" />
						</div>
						<h3 class="mb-2 text-xl font-bold text-gray-900">{benefit.title}</h3>
						<p class="text-gray-600">{benefit.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-white py-20">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-12 text-center shadow-2xl">
				<h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl">
					Ready to Get Started?
				</h2>
				<p class="mb-8 text-xl text-emerald-50">
					Get a free estimate for your bathroom project today.
				</p>
				<div class="mx-auto max-w-2xl">
					<ServiceForm serviceType={BATHROOM_SERVICE_TYPES} thumbtackUrl="https://www.thumbtack.com/k/bathroom-remodeling/near-me" />
				</div>
			</div>
		</div>
	</section>

	<Footer />
</div>
