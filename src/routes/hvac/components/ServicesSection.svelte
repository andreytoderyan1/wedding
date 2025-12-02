<script lang="ts">
	import { CheckCircle, Thermometer } from '@lucide/svelte';

	interface Service {
		title: string;
		description: string;
		features: string[];
		icon: typeof Thermometer;
		image: string;
	}

	interface Props {
		services: Service[];
	}

	let { services }: Props = $props();
</script>

<!-- Services Section -->
<section class="bg-gray-50 px-4 py-20" id="services">
	<div class="mx-auto max-w-7xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl">
				Complete HVAC Solutions
			</h2>
			<p class="mx-auto max-w-3xl text-lg text-slate-600">
				From heating and cooling to air quality, our expert team provides comprehensive HVAC services 
				for your home with professional installation and maintenance.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each services as service}
				{@const Icon = service.icon}
				<div class="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
					<!-- Service Image Placeholder -->
					<div class="relative h-48 overflow-hidden bg-linear-to-br from-blue-400 to-blue-600">
						<!-- Replace service.image with actual image path when available -->
						<div class="flex h-full w-full items-center justify-center">
							<Icon class="h-16 w-16 text-white opacity-50" />
						</div>
						<div class="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
							<Icon class="h-6 w-6 text-blue-600" />
						</div>
					</div>
					<div class="p-6">
						<h3 class="mb-3 text-xl font-bold text-slate-800">{service.title}</h3>
						<p class="mb-4 text-slate-600">{service.description}</p>
						<ul class="space-y-2">
							{#each service.features as feature}
								<li class="flex items-center text-sm text-slate-700">
									<CheckCircle class="mr-2 h-4 w-4 shrink-0 text-green-500" />
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

