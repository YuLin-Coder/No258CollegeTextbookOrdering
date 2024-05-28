<template>
	<router-link :to="url" class="div_label card">
		<div :class="'media img-base ' + bg_color">
			<figure class="icon img">
				<i :class="icon"></i>
			</figure>
		</div>
		<div class="doc">
			<div><span class="num">{{ num }}</span><span class="unit">/ {{ unit }}</span></div>
			<div class="title">{{ title }}</div>
			<div class="content">{{ content }}</div>
		</div>
	</router-link>
</template>

<script>
	export default {
		props: {
			icon: {
				trye: String,
				default: ""
			},
			title: {
				trye: String,
				default: ""
			},
			content: {
				trye: String,
				default: ""
			},
			url: {
				trye: String,
				default: ""
			},
			api: {
				trye: String,
				default: ""
			},
			unit: {
				trye: String,
				default: ""
			},
			bg_color: {
				trye: String,
				default: ""
			}
		},
		data(){
			return {
				num: 0
			}
		},
		methods:{
			get_num(){
				var api = [];
				api = this.api.split(",");
				for (let i = 0; i < api.length; i++) {
					this.$get(api[i], {}, (json) => {
						if(json && json.result){
							this.num = this.num + json.result
						}
					});
				}
				// this.$get(this.api, {}, (json) => {
				// 	if(json && json.result){
				// 		this.num = json.result
				// 	}
				// });
			}
		},
		created(){
			this.get_num()
		}
	}
</script>

<style scoped="scoped">
	.div_label {
		display: block;
		overflow: hidden;
	}

	.div_label .media {
		float: left;
	}

	.div_label .img-base figure {
		text-align: center;
		line-height: 4rem;
	}

	.div_label .img-base i {
		font-size: 2.5rem;
	}

	.div_label .title {
		font-size: 0.75rem;
		font-weight: 600;
	}

	.div_label .content {
		color: #999;
		font-size: 0.875rem;
		line-height: 1;
	}

	.div_label .unit {
		font-size: 0.75rem;
		margin-left: .5rem;
		font-weight: normal;
	}

	.div_label .num {
		font-size: 1.25rem;
	}
</style>
