<script lang="ts">
	import { Award, Clock, Star, Thermometer, CheckCircle } from '@lucide/svelte';

	interface Stat {
		value: string;
		label: string;
		icon: typeof Award;
	}

	interface Props {
		stats: Stat[];
		scrollToSection: (selector: string, offset?: number) => void;
	}

	let { stats, scrollToSection }: Props = $props();
</script>

<!-- Hero Section with Background Image -->
<section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
	<!-- Background Image - Replace with HVAC-specific image -->
	<div class="absolute inset-0 z-0">
		<img
			src="/new-house.webp"
			alt="Modern home with HVAC system"
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-linear-to-r from-slate-900/10 via-blue-900/15 to-slate-900/40"></div>
	</div>

	<!-- Hero Content -->
	<div class="relative z-10 mx-auto max-w-7xl px-4 py-20">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<!-- Left Column - Main Content -->
			<div class="text-white bg-blue-200/10 p-8 rounded-2xl backdrop-blur-xs">
				<div class="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
					<Award class="h-4 w-4" />
					<span>Trusted HVAC Professionals Since 2009</span>
				</div>
				<h1 class="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
					Expert HVAC Services for Your Home
				</h1>
				<p class="mb-8 text-xl leading-relaxed text-blue-100 sm:text-2xl">
					Keep your home comfortable year-round with professional heating, cooling, and air quality solutions. 
					<span class="font-semibold text-white">24/7 emergency service available.</span>
				</p>
				
				<!-- Trust Badges -->
				<div class="mb-8 flex flex-wrap gap-4">
					<div class="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
						<Thermometer class="h-5 w-5 text-blue-300" />
						<span class="font-medium">Climate Control</span>
					</div>
					<div class="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
						<Clock class="h-5 w-5 text-blue-300" />
						<span class="font-medium">24/7 Service</span>
					</div>
					<div class="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
						<Star class="h-5 w-5 fill-yellow-400 text-yellow-400" />
						<span class="font-medium">5-Star Rated</span>
					</div>
				</div>

				<!-- CTA Buttons -->
				<div class="flex flex-col gap-4 sm:flex-row">
					<a
						href="https://www.thumbtack.com/k/hvac-contractors/near-me"
						target="_blank"
						rel="noopener noreferrer"
						class="group rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105 text-center"
					>
						Get Free Estimate
						<span class="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
					</a>
					<button
						onclick={() => scrollToSection("#services", 100)}
						class="rounded-lg border-2 border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
					>
						View Services
					</button>
				</div>
			</div>

			<!-- Right Column - Stats Card -->
			<div class="hidden lg:block">
				<div class="rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
					<h3 class="mb-6 text-2xl font-bold text-slate-800">Why Choose Us?</h3>
					<div class="space-y-4">
						{#each stats as stat}
							{@const Icon = stat.icon}
							<div class="flex items-center gap-4">
								<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
									<Icon class="h-6 w-6 text-blue-600" />
								</div>
								<div>
									<div class="text-xl font-bold text-slate-800">{stat.value}</div>
									<div class="text-sm text-slate-600">{stat.label}</div>
								</div>
							</div>
						{/each}
					</div>
					<div class="mt-6 rounded-lg bg-green-50 p-4">
						<div class="flex items-center gap-2 text-green-700">
							<CheckCircle class="h-5 w-5" />
							<span class="font-semibold">Licensed & Insured</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

