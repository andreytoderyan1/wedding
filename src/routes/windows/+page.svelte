<script lang="ts">
	import { ArrowLeft, Star, CheckCircle, Zap, Shield, Award } from '@lucide/svelte';
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
			icon: Zap
		},
		{
			title: 'Window Repair',
			description: 'Fix broken seals, cracked glass, and malfunctioning mechanisms',
			features: ['Glass Replacement', 'Seal Repair', 'Hardware Fixes', 'Frame Repairs'],
			icon: Shield
		},
		{
			title: 'Energy Efficient Windows',
			description: 'Upgrade to windows that save energy and reduce utility bills',
			features: ['Low-E Glass', 'Argon Gas Filled', 'Insulated Frames', 'Weather Stripping'],
			icon: Zap
		},
		{
			title: 'Custom Windows',
			description: 'Design and install custom windows for unique spaces',
			features: ['Custom Shapes', 'Specialty Glass', 'Architectural Design', 'Premium Materials'],
			icon: Award
		}
	];

	const benefits = [
		'Energy savings up to 30%',
		'Improved home comfort',
		'Enhanced curb appeal',
		'Better noise reduction',
		'Increased home value',
		'Professional installation'
	];
</script>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<header class="bg-white px-4 py-4 shadow-sm">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="flex items-center">
				<button onclick={goBack} class="mr-4 flex items-center text-blue-600 hover:text-blue-800">
					<ArrowLeft class="mr-2 h-5 w-5" />
					Back
				</button>
				<img src="/HomeQuote.png" alt="HomeQuote Logo" class="h-10" />
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="relative overflow-hidden bg-white py-24">
		<!-- Geometric background pattern -->
		<div class="absolute inset-0 z-0 opacity-5">
			<div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, #3b82f6, #3b82f6 10px, transparent 10px, transparent 20px);"></div>
		</div>
		<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid gap-16 lg:grid-cols-2 lg:items-center">
				<div class="space-y-6">
					<div class="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
						Energy Efficient Solutions
					</div>
					<h1 class="text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">
						Professional <span class="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Window Services</span>
					</h1>
					<p class="text-xl leading-relaxed text-slate-600 lg:text-2xl">
						Transform your home with energy-efficient windows. From replacement to repair, we provide quality window solutions that enhance comfort and save energy.
					</p>
					<div class="flex flex-wrap gap-4 pt-4">
						<div class="flex items-center gap-2 rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-2">
							<Zap class="h-5 w-5 text-blue-600" />
							<span class="font-semibold text-slate-700">Energy Star</span>
						</div>
						<div class="flex items-center gap-2 rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-2">
							<Shield class="h-5 w-5 text-blue-600" />
							<span class="font-semibold text-slate-700">Warranty</span>
						</div>
					</div>
				</div>
				<div class="relative">
					<div class="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 blur-2xl"></div>
					<img 
						src="/windows-hero.jpg" 
						alt="Modern home with energy-efficient windows" 
						class="relative aspect-video w-full rounded-2xl object-cover shadow-2xl ring-4 ring-blue-100"
					/>
				</div>
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
					<ServiceForm serviceType={WINDOW_SERVICE_TYPES} />
				</div>
			</div>
		</div>
	</section>

	<!-- Trust Badges -->
	<section class="bg-slate-900 py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<div class="text-center">
					<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
						<Zap class="h-8 w-8 text-white" />
					</div>
					<h3 class="mb-2 text-xl font-bold text-white">Energy Efficient</h3>
					<p class="text-slate-400">Save up to 30% on energy costs</p>
				</div>
				<div class="text-center">
					<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-600">
						<Shield class="h-8 w-8 text-white" />
					</div>
					<h3 class="mb-2 text-xl font-bold text-white">Warranty Protected</h3>
					<p class="text-slate-400">Comprehensive warranty coverage</p>
				</div>
				<div class="text-center">
					<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500">
						<Star class="h-8 w-8 fill-white text-white" />
					</div>
					<h3 class="mb-2 text-xl font-bold text-white">5-Star Rated</h3>
					<p class="text-slate-400">Trusted by thousands</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section class="bg-white py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-slate-800 sm:text-5xl">
					Complete Window Solutions
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-slate-600">
					From energy-efficient replacements to custom designs, our expert team provides comprehensive window services for your home.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each windowServices as service}
					{@const Icon = service.icon}
					<div class="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white p-6 shadow-md transition-all hover:border-blue-400 hover:shadow-2xl">
						<div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
						<div class="relative mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
							<Icon class="h-7 w-7 text-white" />
						</div>
						<h3 class="mb-2 text-xl font-bold text-slate-800">{service.title}</h3>
						<p class="mb-4 text-sm text-slate-600">{service.description}</p>
						<ul class="space-y-1.5">
							{#each service.features as feature}
								<li class="flex items-center gap-2 text-sm text-slate-600">
									<div class="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
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
	<section class="bg-slate-50 py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-4xl font-bold text-slate-800 sm:text-5xl">
					Benefits of <span class="text-blue-600">New Windows</span>
				</h2>
			</div>
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each benefits as benefit}
					<div class="group flex items-start gap-4 rounded-lg border-2 border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-400 hover:shadow-lg">
						<div class="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-600 transition-colors">
							<CheckCircle class="h-5 w-5 text-blue-600 group-hover:text-white transition-colors" />
						</div>
						<p class="text-base font-semibold text-slate-800">{benefit}</p>
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
					<ServiceForm serviceType={WINDOW_SERVICE_TYPES} />
				</div>
			</div>
		</div>
	</section>

	<Footer />
</div>

