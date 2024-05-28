<template>
	<div class="warp diy_pager">
		<div class="container">
			<div class="row">
				<div class="col-2 col-lg-4 diy_pager_item">
					<select v-model="data_size" class="select" @change="to_size(data_size)">
						<option v-for="(o,i) in list" :value="o">{{o}}</option>
					</select>
				</div>
				<div class="col diy_pager_item">
					<nav aria-label="Page navigation example">
					  <ul class="pagination">
					    <li class="page-item">
							<a class="page-link" @click="fluctuate(-1)" href="javascript:void(0)" :class="{'disabled':page === 1}" >
								{{ prev_name }}
							</a>
						</li>
					    <li class="page-item" :class="{'active': page === i}" v-for="i in page_num" v-if="i >= (page-max) && i < (page+max)">
							<a class="page-link" @click="to(i)" href="javascript:void(0)" >
								{{i}}
							</a>
						</li>
					    <li class="page-item">
							<a class="page-link" @click="fluctuate(1)" href="javascript:void(0)" :class="{'disabled':page === page_num}" >
								{{ next_name }}
							</a>
						</li>
					  </ul>
					</nav>
				</div>
				<div class="col-2 col-lg-4 diy_pager_item">
					<span class="info">共{{count}}条{{page_num}}页</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import mixin from "@/mixins/component.js";
	export default {
		// mixins: [mixin],
		components: {},
		props: {
			page: {
				type: Number,
				default: function(){
					return 1;
				}
			},
			size: {
				type: Number,
				default: function(){
					return 10;
				}
			},
			count: {
				type: Number,
				default: function(){
					return 0;
				}
			},
			prev_name: {
				type: String,
				default: function(){
					return "<<";
				}
			},
			next_name: {
				type: String,
				default: function(){
					return ">>";
				}
			},
			list: {
				type: Array,
				default: function(){
					return [10,20,50,100];
				}
			},
			show_num: {
				type: Number,
				default: function(){
					return 5;
				}
			},
		},
		data() {
			return {
				data_size: 0
			}
		},
		methods: {
			fluctuate(i){
				var page = this.page+1;
				this.to(page);
			},
			to(i){
				this.$emit("toPage",i);
			},
			to_size(size){
				this.$emit("toSize",size);
			},
		},
		computed: {
			max: function(){
				var num = Math.floor(this.show_num/2);
				return num;
			},
			page_num: function(){
				return Math.ceil(this.count / this.size) || 1;
			}
		},
		created() {
			this.data_size = this.size;
		}
	}
</script>

<style>
</style>
