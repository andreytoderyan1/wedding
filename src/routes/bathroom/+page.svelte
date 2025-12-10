<script lang="ts">
	import { ArrowLeft, Star, CheckCircle, Zap, Shield, Award, Home } from '@lucide/svelte';
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
			icon: Award
		},
		{
			title: 'Bathroom Repair',
			description: 'Fix leaks, damaged tiles, and malfunctioning fixtures',
			features: ['Leak Repair', 'Tile Replacement', 'Fixture Repair', 'Plumbing Fixes'],
			icon: Shield
		},
		{
			title: 'Luxury Bathroom Upgrades',
			description: 'Upgrade to luxury bathrooms that enhance comfort and value',
			features: ['Walk-in Showers', 'Freestanding Tubs', 'Heated Floors', 'Smart Fixtures'],
			icon: Zap
		},
		{
			title: 'Custom Bathroom Design',
			description: 'Design and install custom bathrooms for unique spaces',
			features: ['Custom Layouts', 'Specialty Materials', 'Architectural Design', 'Premium Finishes'],
			icon: Award
		}
	];

	const benefits = [
		'Increased home value up to 60%',
		'Improved daily comfort',
		'Enhanced functionality',
		'Better water efficiency',
		'Modern aesthetics',
		'Professional installation'
	];
</script>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<header class="bg-white px-4 py-4 shadow-sm">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="flex items-center">
				<button onclick={goBack} class="mr-4 flex items-center text-emerald-600 hover:text-emerald-800">
					<ArrowLeft class="mr-2 h-5 w-5" />
					Back
				</button>
				<img src="/HomeQuote.png" alt="HomeQuote Logo" class="h-10" />
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20">
		<div class="absolute inset-0 z-0">
			<div class="h-full w-full bg-gradient-to-br from-emerald-100/50 via-teal-100/50 to-cyan-100/50"></div>
		</div>
		<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
				<div class="order-2 lg:order-1">
					<h1 class="mb-6 text-5xl font-bold leading-tight text-slate-900 lg:text-6xl">
						Professional <span class="text-emerald-600">Bathroom Services</span>
					</h1>
					<p class="mb-8 text-xl leading-relaxed text-slate-700 lg:text-2xl">
						Transform your bathroom with modern designs and quality fixtures. From remodeling to repair, we provide comprehensive bathroom solutions that enhance comfort and value.
					</p>
				</div>
				<div class="relative order-1 lg:order-2">
					<img 
						src="/bathroom-hero.jpg" 
						alt="Modern home exterior" 
						class="aspect-video w-full rounded-2xl object-cover shadow-2xl ring-4 ring-emerald-200/50"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Find Contractor Section -->
	<section class="bg-gradient-to-br from-slate-50 to-emerald-50/30 py-16">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 shadow-xl sm:p-12">
				<h2 class="mb-6 text-center text-3xl font-bold text-white sm:text-4xl">
					Find a Verified Contractor in Minutes
				</h2>
				<div class="mx-auto max-w-2xl">
					<ServiceForm serviceType={BATHROOM_SERVICE_TYPES} />
				</div>
			</div>
		</div>
	</section>

	<!-- Trust Badges -->
	<section class="bg-gradient-to-r from-emerald-50 to-teal-50 py-12">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-wrap justify-center gap-8">
				<div class="flex items-center gap-2 rounded-lg bg-white px-6 py-3 shadow-md text-slate-700">
					<Home class="h-6 w-6 text-emerald-600" />
					<span class="font-semibold">Modern Design</span>
				</div>
				<div class="flex items-center gap-2 rounded-lg bg-white px-6 py-3 shadow-md text-slate-700">
					<Shield class="h-6 w-6 text-emerald-600" />
					<span class="font-semibold">Warranty Protected</span>
				</div>
				<div class="flex items-center gap-2 rounded-lg bg-white px-6 py-3 shadow-md text-slate-700">
					<Star class="h-6 w-6 fill-yellow-400 text-yellow-400" />
					<span class="font-semibold">5-Star Rated</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section class="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20">
		<!-- Decorative circles -->
		<div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl"></div>
		<div class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal-200/30 blur-3xl"></div>
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-slate-800 sm:text-5xl">
					Complete <span class="text-emerald-600">Bathroom Solutions</span>
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-slate-600">
					From modern remodeling to custom designs, our expert team provides comprehensive bathroom services for your home.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				{#each bathroomServices as service}
					{@const Icon = service.icon}
					<div class="group relative overflow-hidden rounded-3xl border-2 border-emerald-200/50 bg-white p-8 shadow-xl transition-all hover:border-emerald-400 hover:shadow-2xl hover:-translate-y-2">
						<div class="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-2xl transition-transform group-hover:scale-150"></div>
						<div class="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-xl">
							<Icon class="h-10 w-10 text-white" />
						</div>
						<h3 class="mb-3 text-2xl font-bold text-slate-800">{service.title}</h3>
						<p class="mb-6 text-slate-600 leading-relaxed">{service.description}</p>
						<ul class="space-y-3">
							{#each service.features as feature}
								<li class="flex items-center gap-3 text-slate-600">
									<div class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
										<CheckCircle class="h-4 w-4 text-emerald-600" />
									</div>
									<span class="font-medium">{feature}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Benefits Section -->
	<section class="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-4xl font-bold text-slate-800 sm:text-5xl">
					Benefits of <span class="text-emerald-600">Bathroom Remodeling</span>
				</h2>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each benefits as benefit}
					<div class="flex items-start gap-4 rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105 border-l-4 border-emerald-500">
						<CheckCircle class="h-6 w-6 shrink-0 text-emerald-600" />
						<p class="text-lg font-semibold text-slate-800">{benefit}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-gradient-to-br from-slate-50 to-emerald-50/50 py-20">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-12 text-center shadow-2xl ring-4 ring-emerald-200/50">
				<h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl">
					Ready to Get Started?
				</h2>
				<p class="mb-8 text-xl text-emerald-50">
					Get a free estimate for your bathroom project today.
				</p>
				<div class="mx-auto max-w-2xl">
					<ServiceForm serviceType={BATHROOM_SERVICE_TYPES} />
				</div>
			</div>
		</div>
	</section>

	<Footer />
</div>

