<template>
	<div class="nav_quick">
		<div v-for="(o, i) in list" :key="i" v-if="o[vm.title]" class="item">
			<a :href="o[vm.url]">
				<div class="item link-arrow">
					<div class="media"><img src="o[vm.img]"></div>
					<div>{{o[vm.title]}} <span class="fr">{{ o[vm.desc] }}</span></div>
				</div>
			</a>
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
				}
			},
			vm: {
				type: Object,
				default: function() {
					return {
						img: "img",
						title: "title",
						url: "url",
						desc: "desc"
					}
				}
			},
			span: {
				type: Number,
				default: 4
			}
		},
		data() {
			var col = 12 / this.span;
			return {
				col
			}
		}
	}
</script>

<style scoped>
	image {
		border-radius: 1rem;
		overflow: hidden;
	}

	.list_menu {
		text-align: center;
	}

	.menu {
		padding: 0.75rem;
	}

	.menu text {
		font-size: 0.875rem;
	}
</style>
