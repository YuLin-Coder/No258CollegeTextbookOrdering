<template>
	<div class="list_article_hot">
		<!-- 热门文章组件 -->
		<div class="item" v-for="(o, i) in list" :data-text="i + 1" :key="i">
			<router-link :to="'/article/details?article_id=' + o[vm.article_id]">
				<div class="title">
					{{ o[vm.title] }}
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				},
			},
			vm: {
				type: Object,
				default: function() {
					return {
						img: "img",
						article_id: "article_id",
						title: "title",
						description: "description",
						title: "title",
						create_time: "create_time",
						content: "content",
						praise_len: "praise_len",
						hits: "hits",
					};
				},
			},
		},
		methods: {},
	};
</script>

<style scoped>
	.list_article_hot .item {
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		padding-left: 1rem;
		position: relative;
	}

	.list_article_hot .item::before {
		content: attr(data-text);
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.list_article_hot .title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
