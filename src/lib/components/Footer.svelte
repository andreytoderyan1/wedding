<script lang="ts">
	import { Home, Phone, Mail, MapPin } from '@lucide/svelte';
</script>

<footer class="bg-slate-900 text-white">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Company Info -->
			<div>
				<h3 class="mb-4 text-lg font-semibold">HVAC Services</h3>
				<p class="mb-4 text-sm text-slate-400">
					Professional heating, cooling, and air quality solutions for your home.
				</p>
				<div class="flex items-center gap-2 text-sm text-slate-400">
					<MapPin class="h-4 w-4" />
					<span>Serving Your Area</span>
				</div>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="mb-4 text-lg font-semibold">Quick Links</h3>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/" class="text-slate-400 transition-colors hover:text-white">Home</a>
					</li>
					<li>
						<a href="/hvac" class="text-slate-400 transition-colors hover:text-white">HVAC Services</a>
					</li>
					<li>
						<a href="/hvac#services" class="text-slate-400 transition-colors hover:text-white">Our Services</a>
					</li>
					<li>
						<a href="/hvac#get-estimate" class="text-slate-400 transition-colors hover:text-white">Get Estimate</a>
					</li>
				</ul>
			</div>

			<!-- Services -->
			<div>
				<h3 class="mb-4 text-lg font-semibold">Services</h3>
				<ul class="space-y-2 text-sm">
					<li class="text-slate-400">AC Installation & Repair</li>
					<li class="text-slate-400">Heating Systems</li>
					<li class="text-slate-400">Indoor Air Quality</li>
					<li class="text-slate-400">Maintenance Plans</li>
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h3 class="mb-4 text-lg font-semibold">Contact Us</h3>
				<ul class="space-y-3 text-sm">
					<li class="flex items-center gap-2 text-slate-400">
						<Phone class="h-4 w-4" />
						<span>24/7 Emergency Service</span>
					</li>
					<li class="flex items-center gap-2 text-slate-400">
						<Mail class="h-4 w-4" />
						<span>info@hvacservices.com</span>
					</li>
					<li class="flex items-center gap-2 text-slate-400">
						<Home class="h-4 w-4" />
						<span>Licensed & Insured</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="mt-8 border-t border-slate-800 pt-8">
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<p class="text-sm text-slate-400">
					© {new Date().getFullYear()} HVAC Services. All rights reserved.
				</p>
				<div class="flex gap-6 text-sm text-slate-400">
					<a href="#" class="transition-colors hover:text-white">Privacy Policy</a>
					<a href="#" class="transition-colors hover:text-white">Terms of Service</a>
				</div>
			</div>
		</div>
	</div>
</footer>

