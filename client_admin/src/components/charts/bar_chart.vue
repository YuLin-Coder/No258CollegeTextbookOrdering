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
			list: {
				type: Array,
				required: true
			},
			vm: {
				type: Object,
				default: function() {
					return {
						name: "name",
						time: "time",
						value: "value",
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
			this.init_chart();
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

				var list_time = this.list_time;
				var xAxis = option.xAxis[0];
				xAxis.data = list_time;

				let myChart = echarts.init(document.getElementById(this.id));
				myChart.setOption(option);
			},
		},
		computed: {
			list_time() {
				var vm = this.vm;
				var list = this.list;
				var arr = [];
				if (list.length > 0) {
					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						var time = o[vm.time];
						if (arr.indexOf(time) === -1) {
							arr.push(time);
						}
					}
				}
				return arr;
			},
			series() {
				var vm = this.vm;
				var list = this.list;
				var series = [];
				if (list.length > 0) {
					var dict_type = {};
					var list_time = this.list_time;
					
					// 初始化数值长度
					var init_num = new Array(list_time.length).fill(0);
					
					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						var name = o[vm.name];
						// 初始化类
						dict_type[name] = {
							name,
							type: 'bar',
							data: [].concat(init_num)
						}
					};
					
					list.map(o => {
						var idx = list_time.indexOf(o[vm.time]);
						if (idx !== -1) {
							// 赋予类的对应位值
							dict_type[o[vm.name]].data[idx] = o[vm.value];
						}
					});
					
					for (var key in dict_type) {
						series.push(dict_type[key]);
					}
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
