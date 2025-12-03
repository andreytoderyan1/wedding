<script lang="ts">
	import { goto } from '$app/navigation';
	import { 
		Thermometer, 
		Wind, 
		Home, 
		Shield, 
		Clock, 
		Star, 
		CheckCircle, 
		ArrowRight,
		Wrench,
		Zap,
		Users,
		Award,
		Phone,
		Mail,
		MapPin
	} from '@lucide/svelte';
	import Navigation from '$lib/components/Navigaton.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	let zipCode: string = $state('');
	let utmData = $state({
		utm_source: 'cma-powerfoxmedia',
		utm_medium: '',
		utm_campaign: '',
		utm_subid: ''
	});

	const scrollToSection = (selector: string, offset: number = 100) => {
		const el = document.querySelector(selector);
		if (!el) return;
		const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	};

	const handleZipChange = (e: Event) => {
		zipCode = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 5);
	};

	const getFreeEstimate = () => {
		if (!zipCode.trim()) {
			alert('Please enter a ZIP code');
			return;
		}
		if (zipCode.length !== 5) {
			alert('Please enter a valid 5-digit ZIP code');
			return;
		}
		const params = new URLSearchParams();
		params.set('zipCode', zipCode.trim());
		params.set('utm_source', utmData.utm_source);
		params.set('utm_medium', utmData.utm_medium);
		params.set('utm_campaign', utmData.utm_campaign);
		params.set('utm_subid', utmData.utm_subid);
		goto(`/services?${params.toString()}`);
	};

	onMount(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const utmSource = queryParams.get('utm_source');
		const utmMedium = queryParams.get('utm_medium');
		const utmCampaign = queryParams.get('utm_campaign');
		const utmSubid = queryParams.get('clickId') || queryParams.get('utm_subid');
		if (utmSource) utmData.utm_source = utmSource;
		if (utmMedium) utmData.utm_medium = utmMedium;
		if (utmCampaign) utmData.utm_campaign = utmCampaign;
	});

	const services = [
		{
			title: 'Air Conditioning',
			description: 'Complete AC installation, repair, and maintenance services to keep your home cool and comfortable.',
			icon: Wind,
			features: ['New AC Installation', 'AC Repair & Service', 'Ductless Mini-Splits', 'Central Air Systems'],
			color: 'from-cyan-500 to-blue-600'
		},
		{
			title: 'Heating Systems',
			description: 'Professional heating solutions including furnaces, heat pumps, and boiler systems.',
			icon: Thermometer,
			features: ['Furnace Installation', 'Heat Pump Service', 'Boiler Repair', 'Radiant Heating'],
			color: 'from-orange-500 to-red-600'
		},
		{
			title: 'Indoor Air Quality',
			description: 'Improve your home\'s air quality with advanced filtration and purification systems.',
			icon: Shield,
			features: ['Air Purifiers', 'Humidifiers', 'Dehumidifiers', 'UV Air Sanitizers'],
			color: 'from-green-500 to-emerald-600'
		},
		{
			title: 'Maintenance Plans',
			description: 'Regular maintenance to ensure your HVAC system runs efficiently year-round.',
			icon: Wrench,
			features: ['Seasonal Tune-ups', 'Filter Replacements', 'System Inspections', 'Priority Service'],
			color: 'from-purple-500 to-indigo-600'
		}
	];

	const whyChooseUs = [
		{
			title: 'Expert Technicians',
			description: 'All our technicians are certified, licensed, and undergo continuous training.',
			icon: Award
		},
		{
			title: '24/7 Emergency Service',
			description: 'Round-the-clock availability for urgent HVAC emergencies.',
			icon: Clock
		},
		{
			title: 'Energy Efficient',
			description: 'Save money with energy-efficient systems and smart thermostats.',
			icon: Zap
		},
		{
			title: 'Satisfaction Guaranteed',
			description: 'We stand behind our work with comprehensive warranties.',
			icon: CheckCircle
		}
	];

	const stats = [
		{ value: '15+', label: 'Years in Business', icon: Award },
		{ value: '50K+', label: 'Happy Customers', icon: Users },
		{ value: '4.9', label: 'Average Rating', icon: Star },
		{ value: '24/7', label: 'Emergency Service', icon: Clock }
	];
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
	<Navigation />

	<!-- Hero Section -->
	<section class="relative overflow-hidden py-20 lg:py-32">
		<!-- Background Image -->
		<div class="absolute inset-0 z-0">
			<img
				src="/hero-home-dark.jpg"
				alt="Professional HVAC Services"
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-slate-800/00 to-slate-900/30"></div>
			<div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]"></div>
		</div>
		<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
				<div>
					<div class="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
						<Star class="h-4 w-4 text-yellow-400" />
						<span>Trusted by 50,000+ Homeowners</span>
					</div>
					<h1 class="mb-6 text-5xl font-bold leading-tight lg:text-7xl">
						Professional HVAC Services
						<span class="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
							You Can Trust
						</span>
					</h1>
					<p class="mb-8 text-xl leading-relaxed text-slate-300 lg:text-2xl">
						Comprehensive heating, cooling, and air quality solutions for your home. 
						Expert installation, repair, and maintenance services available 24/7.
					</p>
					
					<div class="mb-8 flex flex-wrap gap-4">
						<button
							onclick={() => scrollToSection("#get-estimate")}
							class="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
						>
							Get Free Estimate
							<ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
						</button>
						<button
							onclick={() => scrollToSection("#services")}
							class="rounded-lg border-2 border-slate-600 bg-slate-800/50 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-slate-500 hover:bg-slate-800/70"
						>
							View Services
						</button>
					</div>

					<div class="flex flex-wrap gap-6 text-sm text-slate-400">
						<div class="flex items-center gap-2">
							<CheckCircle class="h-5 w-5 text-green-400" />
							<span>Licensed & Insured</span>
						</div>
						<div class="flex items-center gap-2">
							<CheckCircle class="h-5 w-5 text-green-400" />
							<span>15+ Years Experience</span>
						</div>
						<div class="flex items-center gap-2">
							<CheckCircle class="h-5 w-5 text-green-400" />
							<span>100% Satisfaction</span>
						</div>
					</div>
				</div>

				<div class="relative">
					<div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
					<div class="relative grid grid-cols-2 gap-4">
						{#each stats as stat}
							{@const Icon = stat.icon}
							<div class="rounded-2xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700/50">
								<Icon class="mb-3 h-8 w-8 text-blue-400" />
								<div class="text-3xl font-bold text-white">{stat.value}</div>
								<div class="text-sm text-slate-400">{stat.label}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Get Estimate Section -->
	<section id="get-estimate" class="relative py-20">
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
		<div class="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-8 shadow-2xl backdrop-blur-sm border border-slate-700/50 sm:p-12">
				<div class="text-center mb-8">
					<h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl">
						Get Your Free HVAC Estimate
					</h2>
					<p class="text-lg text-slate-300">
						Enter your ZIP code to connect with qualified HVAC professionals in your area
					</p>
				</div>
				
				<div class="mx-auto max-w-md">
					<div class="flex gap-3">
						<input
							type="text"
							placeholder="Enter ZIP code"
							class="flex-1 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
							value={zipCode}
							oninput={handleZipChange}
							maxlength="5"
						/>
						<button
							onclick={getFreeEstimate}
							class="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-xl"
						>
							Get Estimate
						</button>
					</div>
					<div class="mt-4 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
						<div class="flex items-center gap-2">
							<CheckCircle class="h-4 w-4 text-green-400" />
							<span>No obligation</span>
						</div>
						<div class="flex items-center gap-2">
							<CheckCircle class="h-4 w-4 text-green-400" />
							<span>Free quotes</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section id="services" class="py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
					Complete HVAC Solutions
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-slate-300">
					From installation to maintenance, we provide comprehensive HVAC services for every need
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				{#each services as service}
					{@const Icon = service.icon}
					{@const isAC = service.title === 'Air Conditioning'}
					{@const isHeating = service.title === 'Heating Systems'}
					<div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 backdrop-blur-sm border border-slate-700/50 transition-all hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-500/10">
					{#if isAC}
						<div class="absolute inset-0 opacity-10">
							<img
								src="/service-ac-installation.webp"
								alt="AC Installation"
								class="h-full w-full object-cover"
							/>
						</div>
					{/if}
					{#if isHeating}
						<div class="absolute inset-0 opacity-10">
							<img
								src="/heat-pump.jpg"
								alt="Heating System"
								class="h-full w-full object-cover"
							/>
						</div>
					{/if}
						<div class="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br {service.color} opacity-10 blur-2xl"></div>
						<div class="relative">
							<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br {service.color}">
								<Icon class="h-8 w-8 text-white" />
							</div>
							<h3 class="mb-3 text-2xl font-bold text-white">{service.title}</h3>
							<p class="mb-6 text-slate-300">{service.description}</p>
							<ul class="space-y-2">
								{#each service.features as feature}
									<li class="flex items-center gap-2 text-slate-400">
										<CheckCircle class="h-4 w-4 shrink-0 text-blue-400" />
										<span>{feature}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Why Choose Us Section -->
	<section class="py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl">
					Why Choose Our HVAC Services?
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-slate-300">
					We're committed to excellence in every service we provide
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
				{#each whyChooseUs as item}
					{@const Icon = item.icon}
					<div class="rounded-2xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700/50 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
						<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
							<Icon class="h-6 w-6 text-white" />
						</div>
						<h3 class="mb-2 text-xl font-bold text-white">{item.title}</h3>
						<p class="text-slate-300">{item.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-12 text-center shadow-2xl">
				<h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl">
					Ready to Improve Your Home Comfort?
				</h2>
				<p class="mb-8 text-xl text-blue-100">
					Get started with a free estimate from our expert HVAC team
				</p>
				<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<button
						onclick={() => scrollToSection("#get-estimate")}
						class="rounded-lg bg-white px-10 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
					>
						Get Free Estimate
					</button>
					<a
						href="/hvac"
						class="rounded-lg border-2 border-white bg-transparent px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
					>
						Learn More
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Footer />
</div>
