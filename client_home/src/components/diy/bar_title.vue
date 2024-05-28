<template>
	<div class="bar_title">
		<div class="title">
			<router-link :to="url">
				<span>
					{{ title }}
				</span>
			</router-link>
		</div>
		<div class="more" v-if="url">
			<router-link :to="url">
				<span>更多</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ""
			},
			url: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style scoped>
	.bar_title {
		width: 100%;
		display: flex;
		justify-content: space-between;
		line-height: 2rem;
	}

	.title {
		color: #000;
		float: none;
		clear: both;
	}

	
	.more {
		float: right;
		font-size: 0.875rem;
		color: #666;
		overflow: hidden;
		margin-right: 5px;
	}
</style>
