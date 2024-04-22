import * as d3 from 'd3';

export async function load({ fetch }) {
	// load the csv file as a string
	const res = await fetch('/mlb-hitters-2023.csv');
	const text = await res.text();
	// parse the string into an array of objects.
	// d3.autoType will automatically detect the types of the columns
	const dataset = d3.csvParse(text, d3.autoType);
	return { dataset };
}
