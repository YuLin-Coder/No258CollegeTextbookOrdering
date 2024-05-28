<template>
	<div class="container list_menu">
		<div class="row">
			<div v-for="(o, i) in list" :key="i" :class="'col-' + col">
				<a :href="''+o[vm.url]" class="menu" hover-class="hover">
					<img style="width: 100%; height: auto;" :src="$fullUrl(o[vm.img])" mode="widthFix"/>
					<span>{{ o[vm.name] }}</span>
				</a>
			</div>
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
						name: "name",
						url: "url"
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
