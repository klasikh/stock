<template>
	<div class="row justify-content-center">
		<div class="col-xl-12 col-lg-12 col-md-12">
			<div class="row">
				<div class="col-lg-12 mb-4">
					<!-- Simple Tables -->
					<div class="card">
						<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
							<h2 class="m-0 font-weight-bold text-primary">Liste des catégories</h2>
							<router-link to="/store-category" class="btn btn-primary float-right" style="margin-top: 6px;margin-right: 6px;">Ajouter catégorie</router-link>
							<input type="text" placeholder="Rechercher" v-model="searchTerm" class="form-control" style="width: 300px;">
						</div>
						<div class="table-responsive">
							<table class="table align-items-center table-flush">
								<thead class="thead-light">
									<tr>
										<th>Nom de la catégorie</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="category in filtersearch" :key="category.id">
										<td>{{ category.category_name }}</td>
										<td>
											<router-link :to="{name: 'editCategory', params: {id: category.id}}" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></router-link>
											<a @click="deleteCategory(category.id)" class="btn btn-sm btn-danger" style="color: white"><i class="fa fa-trash"></i></a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="card-footer"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

	created(){
		if (!User.loggedIn()) {
			this.$router.push({name: '/'})
		}
	},

	data () {
		return {
			categories: [],
			searchTerm:""
		}
	},
	computed: {
		filtersearch(){
			return this.categories.filter(category => {
				return category.category_name.match(this.searchTerm)
			})
		}
	},
	methods: {
		allCategory(){
			axios.get('/api/category')
			.then(({data}) => (this.categories = data))
			.catch()
		},
		deleteCategory(id){
			Swal.fire({
				title: 'Êtes-vous sûr ?',
				text: "Cette action est irréversible! La suppression d'une catégorie supprime tous les produits qui y sont liés !",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Oui, supprimer!',
				cancelButtonText: 'Annuler'
			}).then((result) => {
				if (result.isConfirmed) {
					axios.delete('/api/category/' + id)
						 .then(() => {
						 	this.categories = this.categories.filter(category => {
						 		return category.id != id
						 	})
						 })
						 .catch(() => {
						 	this.$router.push({name: 'category'})
						 })

					Swal.fire(
						'Supprimée !',
						'La catégorie a bien été supprimée',
						'success'
						)
				}
			})
		}
	},
	mounted(){
		this.allCategory();
	}
}
</script>

<style lang="css" scoped>
#img_size{
	width: 40px;
}
</style>