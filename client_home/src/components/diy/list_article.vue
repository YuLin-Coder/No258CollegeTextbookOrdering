<template>
	<nav class="list_article list list-x item-tb">
		<!-- 文章详情 -->
		<router-link class="article_warp" v-for="(o, i) in list" :key="i"
			:to="'/article/details?' + vm.article_id + '=' + o[vm.article_id]">
			<div class="article">
				<div class="media">
					<div class="icon">
						<img :src="o[vm.img] ? $fullUrl(o[vm.img]) : '/img/default.png'"
							v-default-img="'/img/default.png'" />
					</div>
				</div>
				<div class="doc">
					<div class="title ellipsis_2" style="min-height: 2.8rem">
						{{ o[vm.title] }}
					</div>
					<div class="interact desc">
						<span class="praise">
							<b-icon icon="hand-thumbs-up"/>
							{{ o[vm.praise_len] }}
						</span>
						<span class="see">
							<b-icon icon="eye"/>
							{{ o[vm.hits] }}
						</span>
					</div>
					<div class="time">{{ $toTime(o[vm.create_time],"yyyy-MM-dd hh:mm:ss") }}</div>
				</div>
			</div>
		</router-link>
	</nav>
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

	.article_warp {
		display: flex;
		width: calc(25% - 1rem);
		margin: 0.5rem;
		flex-direction: column;
		justify-content: space-between;
		background-color: white;
		border-radius: 0.5rem;
	}

	.article_warp:hover {
		border: 0.2rem solid #909399;
		box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.15);
	}

	.article_warp:hover img {
		filter: blur(1px);
	}

	.article {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.ellipsis_2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	@media (max-width: 992px) {

		.article_warp {
			width: calc(33% - 1rem);;
		}

	}

	@media (max-width: 768px) {

		.article_warp {
			width: calc(50% - 1rem);;
		}

	}

</style>
