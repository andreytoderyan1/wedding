<script lang="ts">
	import { ArrowLeft, Star, CheckCircle, Zap, Shield, Award, Users, Clock, ArrowRight } from '@lucide/svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ServiceForm from '../../components/ServiceForm.svelte';
	import { WINDOW_SERVICE_TYPES } from '$lib/constants/services.js';

	const goBack = () => {
		window.history.back();
	};

	const windowServices = [
		{
			title: 'Window Replacement',
			description: 'Replace old, inefficient windows with energy-efficient models',
			features: ['Energy Star Certified', 'Double & Triple Pane', 'Custom Sizing', 'Professional Installation'],
			icon: Zap,
			color: 'bg-blue-50 border-blue-200'
		},
		{
			title: 'Window Repair',
			description: 'Fix broken seals, cracked glass, and malfunctioning mechanisms',
			features: ['Glass Replacement', 'Seal Repair', 'Hardware Fixes', 'Frame Repairs'],
			icon: Shield,
			color: 'bg-cyan-50 border-cyan-200'
		},
		{
			title: 'Energy Efficient Windows',
			description: 'Upgrade to windows that save energy and reduce utility bills',
			features: ['Low-E Glass', 'Argon Gas Filled', 'Insulated Frames', 'Weather Stripping'],
			icon: Zap,
			color: 'bg-indigo-50 border-indigo-200'
		},
		{
			title: 'Custom Windows',
			description: 'Design and install custom windows for unique spaces',
			features: ['Custom Shapes', 'Specialty Glass', 'Architectural Design', 'Premium Materials'],
			icon: Award,
			color: 'bg-purple-50 border-purple-200'
		}
	];

	const benefits = [
		{
			title: 'Energy Savings Up to 30%',
			description: 'Reduce your utility bills with energy-efficient windows',
			icon: Zap
		},
		{
			title: 'Enhanced Home Comfort',
			description: 'Better temperature control and noise reduction',
			icon: Shield
		},
		{
			title: 'Increased Home Value',
			description: 'Boost your property value with quality windows',
			icon: Award
		},
		{
			title: 'Professional Installation',
			description: 'Expert installation with comprehensive warranties',
			icon: CheckCircle
		},
		{
			title: 'Free Estimates',
			description: 'No-obligation quotes for all window projects',
			icon: Star
		},
		{
			title: 'Lifetime Warranty',
			description: 'Peace of mind with extensive warranty coverage',
			icon: Shield
		}
	];

	const stats = [
		{ value: '20+', label: 'Years Experience', icon: Award },
		{ value: '25,000+', label: 'Windows Installed', icon: Users },
		{ value: '30%', label: 'Energy Savings', icon: Zap },
		{ value: '4.9★', label: 'Average Rating', icon: Star }
	];
</script>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<header class="bg-white px-4 py-4 shadow-sm border-b border-gray-100">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="flex items-center">
				<button onclick={goBack} class="mr-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
					<ArrowLeft class="mr-2 h-5 w-5" />
					Back
				</button>
				<img src="/HomeQuote.png" alt="HomeQuote Logo" class="h-10" />
			</div>
		</div>
	</header>

	<!-- Premium Hero Section -->
	<section class="relative overflow-hidden bg-linear-to-b from-white via-blue-50/30 to-white py-24 lg:py-32">
		<!-- Background Image -->
		<div class="absolute inset-0">
			<img
				src="/windows-hero.jpg"
				alt="Modern Home with Energy-Efficient Windows"
				class="h-full w-full object-cover opacity-100"
			/>
			<div class="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-white/70"></div>
		</div>
		<div class="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-2xl bg-white/80 backdrop-blur-md p-8 shadow-2xl sm:p-10">
				<div class="text-center">
					<div class="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 shadow-lg">
						<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
						<span>Trusted Window Professionals</span>
					</div>
					<h1 class="mb-6 text-5xl font-extrabold leading-tight text-gray-900 sm:text-6xl lg:text-7xl">
						Expert Window Services
						<br />
						<span class="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">For Your Home</span>
					</h1>
					<p class="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-700">
						Transform your home with energy-efficient windows. From replacement to repair, we provide quality window solutions that enhance comfort and save energy.
					</p>
					
					<!-- Trust Indicators -->
					<div class="flex flex-wrap items-center justify-center gap-6 text-sm mb-8">
						<div class="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 shadow-sm">
							<CheckCircle class="h-5 w-5 text-green-600" />
							<span class="font-medium text-gray-900">Licensed & Insured</span>
						</div>
						<div class="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 shadow-sm">
							<CheckCircle class="h-5 w-5 text-green-600" />
							<span class="font-medium text-gray-900">20+ Years Experience</span>
						</div>
						<div class="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 shadow-sm">
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
							<div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
								<Icon class="h-6 w-6 text-blue-600" />
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
			<div class="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 shadow-xl sm:p-12">
				<h2 class="mb-6 text-center text-3xl font-bold text-white sm:text-4xl">
					Find a Verified Contractor in Minutes
				</h2>
				<div class="mx-auto max-w-2xl">
					<ServiceForm serviceType={WINDOW_SERVICE_TYPES} thumbtackUrl="https://www.thumbtack.com/k/window-and-door-companies/near-me" />
				</div>
			</div>
		</div>
	</section>

	<!-- Services Grid -->
	<section id="services" class="py-20">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
					Complete Window Solutions
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					From energy-efficient replacements to custom designs, our expert team provides comprehensive window services for your home.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				{#each windowServices as service}
					{@const Icon = service.icon}
					<div class="group relative overflow-hidden rounded-2xl border-2 {service.color} p-8 transition-all hover:shadow-xl hover:scale-[1.02]">
						<div class="relative mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
							<Icon class="h-7 w-7 text-blue-600" />
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
					Why Choose Our Window Services?
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					We're committed to providing exceptional service and lasting solutions for your home.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each benefits as benefit}
					{@const Icon = benefit.icon}
					<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-blue-200">
						<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
							<Icon class="h-6 w-6 text-blue-600" />
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
			<div class="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-12 text-center shadow-2xl">
				<h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl">
					Ready to Upgrade Your Windows?
				</h2>
				<p class="mb-8 text-xl text-blue-100">
					Get a free estimate for your window project today.
				</p>
				<div class="mx-auto max-w-2xl">
					<ServiceForm serviceType={WINDOW_SERVICE_TYPES} thumbtackUrl="https://www.thumbtack.com/k/window-and-door-companies/near-me" />
				</div>
			</div>
		</div>
	</section>

	<Footer />
</div>
