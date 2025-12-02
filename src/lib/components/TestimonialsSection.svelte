<script lang="ts">
	import { Star } from '@lucide/svelte';

	interface Testimonial {
		name: string;
		location: string;
		rating: number;
		text: string;
		service: string;
		image: string;
	}

	interface Props {
		testimonials: Testimonial[];
	}

	let { testimonials }: Props = $props();
</script>

<!-- Testimonials Section -->
<section class="bg-white px-4 py-20">
	<div class="mx-auto max-w-7xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl">
				What Our Customers Say
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-slate-600">
				Don't just take our word for it. Here's what our satisfied customers have to say about our services.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			{#each testimonials as testimonial}
				<div class="overflow-hidden rounded-xl bg-white shadow-lg border border-slate-200">
					<div class="p-6">
						<div class="mb-4 flex items-center gap-1">
							{#each Array(testimonial.rating) as _}
								<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
							{/each}
						</div>
						<p class="mb-6 text-slate-700 italic">"{testimonial.text}"</p>
						<div class="flex items-center justify-between border-t border-slate-200 pt-4">
							<div>
								<div class="font-semibold text-slate-800">{testimonial.name}</div>
								<div class="text-sm text-slate-600">{testimonial.location}</div>
							</div>
							<div class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
								{testimonial.service}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

