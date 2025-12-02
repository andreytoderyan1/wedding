<script lang="ts">
	import { Award } from '@lucide/svelte';

	interface Stat {
		value: string;
		label: string;
		icon: typeof Award;
	}

	interface Props {
		stats: Stat[];
	}

	let { stats }: Props = $props();
</script>

<!-- Stats Section -->
<section class="bg-linear-to-r from-blue-600 to-blue-700 px-4 py-20 text-white">
	<div class="mx-auto max-w-7xl">
		<div class="grid gap-8 text-center md:grid-cols-4">
			{#each stats as stat}
				<div class="rounded-xl bg-white/10 p-8 backdrop-blur-sm transition-transform hover:scale-105">
					<div class="mb-4 flex justify-center">
						<div class="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
							{@const Icon = stat.icon}
							<Icon class="h-8 w-8" />
						</div>
					</div>
					<div class="mb-2 text-4xl font-bold">{stat.value}</div>
					<div class="text-blue-100">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

