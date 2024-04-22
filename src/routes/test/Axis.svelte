<script>
	import { fade } from 'svelte/transition';
	export let orientation;
	export let margin;
	export let width;
	export let height;
	export let scale;
	export let label = '';

	/* If the scale is a band scale (not linear), we use its domain */
	$: ticks = scale.bandwidth ? scale.domain() : scale.ticks();

	$: offset = scale.bandwidth ? scale.bandwidth() / 2 : 0;
</script>

<!-- The key removes everything and re-adds it to trigger the transition -->
{#key scale}
	<g transition:fade={{ duration: 250 }}>
		{#if orientation == 'left'}
			<g transform="translate({margin.left})">
				{#each ticks as tick}
					<g transform="translate(0,{scale(tick) + offset})">
						<line x2={-6} stroke="black" />
						<text text-anchor="end" dominant-baseline="middle" fill="black" x={-10}>{tick}</text>
					</g>
				{/each}
				{#if label}
					<text text-anchor="start" dominant-baseline="hanging" fill="black" x={-margin.left}
						>{label}</text
					>
				{/if}
			</g>
		{:else}
			<g transform="translate(0,{height - margin.bottom})">
				{#each ticks as tick}
					<g transform="translate({scale(tick) + offset})">
						<line y2={6} stroke="black" />
						<text text-anchor="middle" dominant-baseline="hanging" fill="black" y={10}>{tick}</text>
					</g>
				{/each}
				{#if label}
					<text text-anchor="end" dominant-baseline="hanging" fill="black" x={width} y={30}
						>{label}</text
					>
				{/if}
			</g>
		{/if}
	</g>
{/key}

<style>
</style>
