<template>
	<div class="line_chart" :id="id">折线图</div>
</template>
<script>
	import echarts from "@/assets/js/echarts.min.js";
	export default {
		name: "Home",
		components: {},
		props: {
			id: {
				type: String,
				default: "lineChart"
			},
			title: {
				type: String,
				default: "XXX折线图"
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
					}
				}
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
						trigger: "axis",
					},
					// legend: {
					//   data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
					//   top:"20px"
					// },
					grid: {
						left: "3%",
						right: "10%",
						bottom: "14%",
						containLabel: true,
					},
					toolbox: {
						feature: {
							saveAsImage: {},
						},
					},
					xAxis: {
						type: "category",
						boundaryGap: false,
						data: [],
					},
					yAxis: {
						type: "value",
					},
					series: [],
				},
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
				if(title){
					option.title.text = title;
				}
				
				var series = this.series;
				option.series = series;

				var list_time = this.list_time;
				var xAxis = option.xAxis;
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
					var list_time = this.list_time;
					var dict_type = {};
					
					// 初始化数值长度
					var init_num = new Array(list_time.length).fill(0);
					
					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						var name = o[vm.name];
						// 初始化类
						dict_type[name] = {
							name,
							type: 'line',
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
