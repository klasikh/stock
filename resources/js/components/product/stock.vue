<template>
	<div class="row justify-content-center">
		<div class="col-xl-12 col-lg-12 col-md-12">
			<div class="row">
				<div class="col-lg-12 mb-4">
					<!-- Simple Tables -->
					<div class="card">
						<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
							<h2 class="m-0 font-weight-bold text-primary">Liste du stock</h2>
							<router-link to="/store-product" class="btn btn-primary float-right" style="margin-top: 6px;margin-right: 6px;">Ajouter produit</router-link>
							<input type="text" placeholder="Rechercher" v-model="searchTerm" class="form-control" style="width: 300px;">
						</div>
						<div class="table-responsive">
							<table class="table align-items-center table-flush">
								<thead class="thead-light">
									<tr>
										<th>Nom du produit</th>
										<th>Code produit</th>
										<th>Image</th>
										<th>Catégorie</th>
										<th>Prix d'achat</th>
										<th>Statut</th>
										<th>Quantité</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="product in filtersearch" :key="product.id">
										<td>{{ product.product_name }}</td>
										<td>{{ product.product_code }}</td>
										<td><img :src="product.image" id="img_size"></td>
										<td>{{ product.category_name }}</td>
										<td>{{ product.buying_price }}</td>
										<td v-if="product.product_quantity >= 1"><span class="badge badge-success">Disponible</span></td>
										<td v-else=""><span class="badge badge-danger">Stock Out</span></td>
										<td>{{ product.product_quantity }}</td>
										<td>
											<router-link :to="{name: 'editStock', params: {id: product.id}}" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></router-link>
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
			products: [],
			searchTerm:""
		}
	},
	computed: {
		filtersearch(){
			return this.products.filter(product => {
				return product.product_name.match(this.searchTerm)
			})
		}
	},
	methods: {
		allProduct(){
			axios.get('/api/product')
			.then(({data}) => (this.products = data))
			.catch()
		},
		deleteProduct(id){
			Swal.fire({
				title: 'Êtes-vous sûr?',
				text: "Cette action est irréversible !",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Oui, supprimer!',
				cancelButtonText: 'Annuler'
			}).then((result) => {
				if (result.isConfirmed) {
					axios.delete('/api/product/' + id)
						 .then(() => {
						 	this.products = this.products.filter(product => {
						 		return product.id != id
						 	})
						 })
						 .catch(() => {
						 	this.$router.push({name: 'product'})
						 })

					Swal.fire(
						'Supprimé !',
						'Le stock a bien été supprimé',
						'success'
						)
				}
			})
		}
	},
	mounted(){
		this.allProduct();
	}
}
</script>

<style lang="css" scoped>
#img_size{
	width: 40px;
}
</style>