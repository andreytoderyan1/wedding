<script lang="ts">
	import { Clock } from '@lucide/svelte';

	interface Benefit {
		title: string;
		description: string;
		icon: typeof Clock;
	}

	interface Props {
		benefits: Benefit[];
	}

	let { benefits }: Props = $props();
</script>

<!-- Why Choose Us / Benefits Section -->
<section class="bg-white px-4 py-20">
	<div class="mx-auto max-w-7xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl">
				Why Choose Our HVAC Services?
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-slate-600">
				We're committed to providing exceptional service and lasting solutions for your home comfort needs.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each benefits as benefit}
				{@const Icon = benefit.icon}
				<div class="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
						<Icon class="h-6 w-6 text-blue-600" />
					</div>
					<h3 class="mb-2 text-xl font-bold text-slate-800">{benefit.title}</h3>
					<p class="text-slate-600">{benefit.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

