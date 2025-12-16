<script lang="ts">
	import { goto } from '$app/navigation';
	import { Shield, Clock, Star, CheckCircle, Thermometer, Users, Award, Zap, ArrowRight, Home, Wrench } from '@lucide/svelte';
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

	const scrollToSection = (selector: string, offset: number = 80) => {
		const el = document.querySelector(selector);
		if (!el) return;
		const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	};

	const handleZipChange = (e: Event) => {
		zipCode = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 5);
	};

	const getFreeEstimate = () => {
		window.open('https://www.thumbtack.com/k/hvac-contractors/near-me', '_blank');
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

	const hvacServices = [
		{
			title: 'AC Installation & Repair',
			description: 'Professional air conditioning installation, repair, and maintenance',
			features: ['New AC Units', 'Emergency Repairs', 'System Upgrades', 'Maintenance Plans'],
			icon: Thermometer,
			color: 'bg-blue-50 border-blue-200'
		},
		{
			title: 'Heating Systems',
			description: 'Furnace repair, heat pump service, and heating system installation',
			features: ['Furnace Repair', 'Heat Pump Service', 'Boiler Maintenance', 'Thermostat Install'],
			icon: Shield,
			color: 'bg-orange-50 border-orange-200'
		},
		{
			title: 'Indoor Air Quality',
			description: "Improve your home's air quality with professional ventilation solutions",
			features: ['Air Purifiers', 'Humidity Control', 'Duct Cleaning', 'Filter Replacement'],
			icon: Zap,
			color: 'bg-green-50 border-green-200'
		},
		{
			title: 'Preventive Maintenance',
			description: 'Regular maintenance to keep your HVAC system running efficiently',
			features: ['Seasonal Tune-ups', 'Filter Changes', 'System Inspection', 'Performance Testing'],
			icon: Clock,
			color: 'bg-purple-50 border-purple-200'
		}
	];

	const benefits = [
		{
			title: '24/7 Emergency Service',
			description: 'Round-the-clock availability for urgent HVAC issues',
			icon: Clock
		},
		{
			title: 'Licensed & Certified',
			description: 'All technicians are fully licensed and certified professionals',
			icon: Award
		},
		{
			title: 'Energy Efficient Solutions',
			description: 'Save money with energy-efficient HVAC systems',
			icon: Zap
		},
		{
			title: 'Comprehensive Warranties',
			description: 'Peace of mind with extensive warranty coverage',
			icon: Shield
		},
		{
			title: 'Free Estimates',
			description: 'No-obligation quotes for all services',
			icon: CheckCircle
		}
	];

	const testimonials = [
		{
			name: 'Sarah Johnson',
			location: 'Downtown',
			rating: 5,
			text: 'Amazing service! They fixed our AC on a Sunday when it was 95 degrees. Professional, fast, and reasonably priced.',
			service: 'AC Repair'
		},
		{
			name: 'Mike Chen',
			location: 'Westside',
			rating: 5,
			text: 'Installed a new HVAC system for our home. The team was knowledgeable and the installation was flawless.',
			service: 'HVAC Installation'
		},
		{
			name: 'Lisa Rodriguez',
			location: 'Northside',
			rating: 5,
			text: 'Great maintenance service. They caught a potential issue before it became a major problem. Highly recommend!',
			service: 'Maintenance'
		}
	];

	const faqs = [
		{
			question: 'How often should I have my HVAC system serviced?',
			answer: 'We recommend annual maintenance for both heating and cooling systems to ensure optimal performance and prevent costly repairs.'
		},
		{
			question: 'Do you offer emergency services?',
			answer: 'Yes! We provide 24/7 emergency HVAC services. Call us anytime for urgent heating or cooling issues.'
		},
		{
			question: 'What brands do you work with?',
			answer: 'We work with all major HVAC brands including Carrier, Trane, Lennox, Rheem, and more. We can service any brand.'
		},
		{
			question: 'How long does a typical installation take?',
			answer: 'Most HVAC installations take 4-8 hours depending on the system size and complexity. We\'ll give you a precise timeline during consultation.'
		},
		{
			question: 'Do you offer financing options?',
			answer: 'Yes, we offer flexible financing options to make HVAC upgrades affordable. Contact us to learn about our payment plans.'
		},
		{
			question: 'What is included in a maintenance visit?',
			answer: 'Our maintenance visits include system inspection, filter replacement, cleaning, performance testing, and recommendations for improvements.'
		}
	];

	const stats = [
		{ value: '15+', label: 'Years Experience', icon: Award },
		{ value: '10,000+', label: 'Happy Customers', icon: Users },
		{ value: '24/7', label: 'Emergency Service', icon: Clock },
		{ value: '4.9★', label: 'Average Rating', icon: Star }
	];
</script>

<div class="min-h-screen bg-white">
	<Navigation />

	<!-- Minimalist Hero Section -->
	<section class="relative overflow-hidden bg-linear-to-b from-white via-blue-50/30 to-white py-24 lg:py-32">
		<!-- Background Image -->
		<div class="absolute inset-0">
			<img
				src="/home2.jpg"
				alt="Modern Home HVAC System"
				class="h-full w-full object-cover opacity-100"
			/>
			<div class="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-white/60"></div>
		</div>
		<div class="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-xl sm:p-8">
				<div class="text-center">
					<div class="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 shadow-lg">
						<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
						<span>Trusted HVAC Professionals</span>
					</div>
					<h1 class="mb-6 text-5xl font-extrabold leading-tight text-gray-900 sm:text-6xl lg:text-7xl">
						Expert HVAC Services
						<br />
						<span class="text-blue-600">For Your Home</span>
					</h1>
					<p class="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-700">
						Keep your home comfortable year-round with professional heating, cooling, and air quality solutions. 
						24/7 emergency service available.
					</p>
					
					<!-- Quick CTA -->
					<div class="mx-auto mb-12 max-w-lg">
						<div class="flex flex-col gap-4 sm:flex-row">
							<input
								type="text"
								placeholder="Enter your ZIP code"
								class="flex-1 rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-lg text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
								value={zipCode}
								oninput={handleZipChange}
								maxlength="5"
							/>
							<button
								onclick={getFreeEstimate}
								class="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105"
							>
								Get Free Quote
								<ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
							</button>
						</div>
						<p class="mt-4 text-sm text-gray-600">
							Free estimates • No obligation • Licensed professionals
						</p>
					</div>

					<!-- Trust Indicators -->
					<div class="flex flex-wrap items-center justify-center gap-8 text-sm">
						<div class="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 shadow-sm">
							<CheckCircle class="h-5 w-5 text-green-600" />
							<span class="font-medium text-gray-900">Licensed & Insured</span>
						</div>
						<div class="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 shadow-sm">
							<CheckCircle class="h-5 w-5 text-green-600" />
							<span class="font-medium text-gray-900">15+ Years Experience</span>
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

	<!-- Services Grid -->
	<section id="services" class="py-20">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
					Complete HVAC Solutions
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					From heating and cooling to air quality, our expert team provides comprehensive HVAC services 
					for your home with professional installation and maintenance.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				{#each hvacServices as service}
					{@const Icon = service.icon}
					{@const isAC = service.title === 'AC Installation & Repair'}
					{@const isHeating = service.title === 'Heating Systems'}
					<div class="group relative overflow-hidden rounded-2xl border-2 {service.color} p-8 transition-all hover:shadow-xl hover:scale-[1.02]">
					{#if isAC}
						<div class="absolute inset-0 opacity-5">
							<img
								src="/service-ac-installation.webp"
								alt="AC Installation"
								class="h-full w-full object-cover"
							/>
						</div>
					{/if}
					{#if isHeating}
						<div class="absolute inset-0 opacity-5">
							<img
								src="/heat-pump.jpg"
								alt="Heating System"
								class="h-full w-full object-cover"
							/>
						</div>
					{/if}
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
					Why Choose Our HVAC Services?
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					We're committed to providing exceptional service and lasting solutions for your home comfort needs.
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

	<!-- Testimonials -->
	<section class="py-20">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
					What Our Customers Say
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					Don't just take our word for it. Here's what our satisfied customers have to say about our services.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-3">
				{#each testimonials as testimonial}
					<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
						<div class="mb-4 flex items-center gap-1">
							{#each Array(testimonial.rating) as _}
								<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
							{/each}
						</div>
						<p class="mb-6 text-gray-700 italic">"{testimonial.text}"</p>
						<div class="flex items-center justify-between border-t border-gray-100 pt-4">
							<div>
								<div class="font-semibold text-gray-900">{testimonial.name}</div>
								<div class="text-sm text-gray-500">{testimonial.location}</div>
							</div>
							<div class="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
								{testimonial.service}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="bg-gray-50 py-20">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
					Frequently Asked Questions
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					Get answers to common questions about our HVAC services.
				</p>
			</div>

			<div class="space-y-4">
				{#each faqs as faq}
					<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
						<h3 class="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
						<p class="text-gray-600 leading-relaxed">{faq.answer}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Final CTA -->
	<section class="py-20">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 p-12 text-center shadow-xl">
				<h2 class="mb-4 text-4xl font-bold text-white sm:text-5xl">
					Ready to Get Started?
				</h2>
				<p class="mb-8 text-xl text-blue-100">
					Get a free estimate from qualified HVAC contractors in your area today.
				</p>
				<div class="mx-auto max-w-md justify-center">
					<div class="flex gap-1">
						<input
							type="text"
							placeholder="Enter ZIP code"
							class="flex-1 rounded-xl border-0 bg-white px-6 py-4 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-white/50"
							value={zipCode}
							oninput={handleZipChange}
							maxlength="5"
						/>
						<button
							onclick={getFreeEstimate}
							class="flex flex-col items-center justify-center rounded-xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-slate-800 hover:scale-105 leading-tight"
						>
							<span>Get</span>
							<span>Quote</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Footer />
</div>
