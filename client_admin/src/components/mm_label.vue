<template>
	<div class="card item-ltb img-base">
		<div v-if="bg_color && icon" class="media" :class="bg_color">
			<figure class="mm_icon img">
				<i :class="icon"></i>
			</figure>
		</div>
		<div class="doc">
			<div class="title">{{num}}<span class="unit">{{unit}}</span></div>
			<div class="content">{{title}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			unit: {
				type: String,
				default: "单位",
			},
			title: {
				type: String,
				default: "内容"
			},
			url: {
				type: String,
				default: ""
			},
			bg_color: {
				type: String,
				default: ""
			},
			icon: {
				type: String,
				default: ""
			},
		},
		data:function(){
			return{
				num:0
			}
		},
		methods:{
			// 获取商品数
			get_url_num() {
				var url = this.url;
				this.$get(
					url,
					null,
					(json) => {
						if (json.result || json.result === 0) {
							this.num = json.result;
						}
					}
				);
			},
		},
		mounted(){
			this.get_url_num();
		}
	}
</script>

<style scoped="scoped">
	.img-base figure {
		text-align: center;
		line-height: 4rem;
	}
	
	.img-base i {
		font-size: 2.5rem;
	}
	
	.img-base .title {
		font-weight: 600;
		font-size: 1.25rem;
		margin-bottom: .125rem;
	}
	
	.img-base .content {
		color: #999;
		font-size: 0.875rem;
		line-height: 1;
	}
	
	.img-base .unit {
		font-size: 0.875rem;
		margin-left: .5rem;
		font-weight: normal;
	}
</style>
