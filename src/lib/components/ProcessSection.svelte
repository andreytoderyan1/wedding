<script lang="ts">
	import { Users, Wrench, Home } from '@lucide/svelte';
</script>

<!-- Image Gallery / Process Section -->
<section class="bg-gray-50 px-4 py-20">
	<div class="mx-auto max-w-7xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-slate-800 sm:text-4xl">
				Our Professional Process
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-slate-600">
				See how we deliver exceptional HVAC services from consultation to completion.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<!-- Process Step 1 -->
			<div class="text-center">
				<div class="mb-6 relative h-64 overflow-hidden rounded-xl bg-linear-to-br from-blue-100 to-blue-200">
					<!-- Replace /hvac-consultation.jpg with actual image path when available -->
					<div class="flex h-full w-full items-center justify-center">
						<Users class="h-20 w-20 text-blue-400 opacity-50" />
					</div>
				</div>
				<div class="mb-2 text-2xl font-bold text-blue-600">1</div>
				<h3 class="mb-2 text-xl font-bold text-slate-800">Free Consultation</h3>
				<p class="text-slate-600">We assess your needs and provide expert recommendations.</p>
			</div>

			<!-- Process Step 2 -->
			<div class="text-center">
				<div class="mb-6 relative h-64 overflow-hidden rounded-xl bg-linear-to-br from-blue-100 to-blue-200">
					<!-- Replace /hvac-installation.jpg with actual image path when available -->
					<div class="flex h-full w-full items-center justify-center">
						<Wrench class="h-20 w-20 text-blue-400 opacity-50" />
					</div>
				</div>
				<div class="mb-2 text-2xl font-bold text-blue-600">2</div>
				<h3 class="mb-2 text-xl font-bold text-slate-800">Professional Installation</h3>
				<p class="text-slate-600">Our certified technicians install with precision and care.</p>
			</div>

			<!-- Process Step 3 -->
			<div class="text-center">
				<div class="mb-6 relative h-64 overflow-hidden rounded-xl bg-linear-to-br from-blue-100 to-blue-200">
					<!-- Replace /hvac-maintenance.jpg with actual image path when available -->
					<div class="flex h-full w-full items-center justify-center">
						<Home class="h-20 w-20 text-blue-400 opacity-50" />
					</div>
				</div>
				<div class="mb-2 text-2xl font-bold text-blue-600">3</div>
				<h3 class="mb-2 text-xl font-bold text-slate-800">Ongoing Support</h3>
				<p class="text-slate-600">We provide maintenance and support to keep your system running.</p>
			</div>
		</div>
	</div>
</section>

