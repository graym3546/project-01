var marginTop = 50;
var marginLeft = 50;
var width = 600;
var height = 400;

d3.csv('http://karl.olsen.yoobee.net.nz/csv-demo/XRO.NZ.csv',
	function(d){

		//data transformation - data cleansing
		var parseDate = d3.timeParse('%Y-%m-%d'); // commenthgjghjg

		return {
			date: parseDate(d.Date),
			close: parseFloat(d.Close)
		};
	
	},
	function(error,data){

		//data scaling
		var minMaxDate = d3.extent(data,function(d){ return d.date});


		var xScale = d3.scaleTime()
						.domain(minMaxDate)
						.range([0,width]);

		var minMaxPrice = d3.extent(data,function(d){ return d.close});

		var yScale = d3.scaleLinear()
						.domain(minMaxPrice)
						.range([height,0]);

		// // //create line generator
		var lineGen = d3.line()
			.x(function(d){ return xScale(d.date)})
			.y(function(d){return yScale(d.close)})

		 //draw the graph

		var graph = d3.select('#stock')
				.append('g')
				.attr('transform','translate('+marginLeft+','+marginTop+')');

		graph.append('path')
			.datum(data)
			.attr('fill','none')
			.attr('stroke','salmon')
			.attr('stroke-width','2')
			.attr('d',lineGen);

		// //axes----

		var yAxisGen = d3.axisLeft(yScale).ticks(4);
		var xAxisGen = d3.axisBottom(xScale).ticks(4);

		graph.append('g')
			.call(yAxisGen);

		graph.append('g')
			.attr('transform','translate(0,'+height+')')
			.call(xAxisGen);


	});





















