<template>
	<div class="bar_chart" :id="id">条形图</div>
</template>

<script>
	import echarts from "@/assets/js/echarts.min.js";
	export default {
		name: "Home",
		components: {},
		props: {
			id: {
				type: String,
				default: "barChart"
			},
			title: {
				type: String,
				default: "XXX条形图"
			},
			vm: {
				type: Object,
				default: function() {
					return {
						xAxis: "xAxis",
						names: "names",
						values: "values",
					};
				},
			}
		},
		data() {
			return {
				option: {
					title: {
						text: "7日个类商品销售额",
						left: "center",
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						bottom: '5%',
						left: "center",
					},
					xAxis: [{
						type: 'category',
						axisTick: {
							show: false
						},
						data: []
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [
						// {
						// 	name: 'Forest',
						// 	type: 'bar',
						// 	barGap: 0,
						// 	emphasis: {
						// 		focus: 'series'
						// 	},
						// 	data: [320, 332, 301, 334, 390]
						// },
					]
				}
			};
		},
		created() {},
		mounted() {
			let that=this;
			setTimeout(function(){
				that.init_chart();
			},200)
		},
		methods: {
			init_chart() {
				var option = this.option;

				var title = this.title;
				if (title) {
					option.title.text = title;
				}

				var series = this.series;
				option.series = series;

				var xAxis = option.xAxis[0];
				xAxis.data = this.vm.xAxis;

				let myChart = echarts.init(document.getElementById(this.id));
				myChart.setOption(option);
			},
		},
		computed: {
			series() {
				var vm = this.vm;
				var list = this.vm.names;
				var values = vm.values;
				var series = [];
				let labelOption = {
					show: true,
					position: "insideBottom",
					distance: 15,
					align: 'left',
					verticalAlign: 'middle',
					rotate: 90,
					formatter: '{c}  {name|{a}}',
					fontSize: 16,
					rich: {
						name: {}
					}
				};
				for (let i=0;i<list.length;i++){
					let data = []
					for (let j=0;j<values.length;j++){
						data.push(values[j][i]);
					}
					let dict_type = {
							name: list[i],
							type: 'bar',
							barGap: 0,
							label: labelOption,
							emphasis: {
								focus: 'series'
							},
						 	data: data
					}
					series.push(dict_type);
				}
				return series;
			}
		},
		watch: {
			list() {
				this.init_chart();
			},
		},
	};
</script>
