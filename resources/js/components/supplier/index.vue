<template>
	<div class="row justify-content-center">
		<div class="col-xl-12 col-lg-12 col-md-12">
			<div class="row">
				<div class="col-lg-12 mb-4">
					<!-- Simple Tables -->
					<div class="card">
						<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
							<h2 class="m-0 font-weight-bold text-primary">Liste des fournisseurs</h2>
							<router-link to="/store-supplier" class="btn btn-primary float-right" style="margin-top: 6px;margin-right: 6px;">Ajouter fournisseur</router-link>
							<input type="text" placeholder="Rechercher" v-model="searchTerm" class="form-control" style="width: 300px;">
						</div>
						<div class="table-responsive">
							<table class="table align-items-center table-flush">
								<thead class="thead-light">
									<tr>
										<th>Nom</th>
										<th>Photo</th>
										<th>Tel</th>
										<th>Nom de société</th>
										<th>Email</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="supplier in filtersearch" :key="supplier.id">
										<td>{{ supplier.name }}</td>
										<td><img :src="supplier.photo" id="img_size"></td>
										<td>{{ supplier.phone }}</td>
										<td>{{ supplier.shopName }}</td>
										<td>{{ supplier.email }}</td>
										<td>
											<router-link :to="{name: 'editSupplier', params: {id: supplier.id}}" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></router-link>
											<a @click="deleteSupplier(supplier.id)" class="btn btn-sm btn-danger" style="color: white"><i class="fa fa-trash"></i></a>
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
			suppliers: [],
			searchTerm:""
		}
	},
	computed: {
		filtersearch(){
			return this.suppliers.filter(supplier => {
				return supplier.phone.match(this.searchTerm)
			})
		}
	},
	methods: {
		allSupplier(){
			axios.get('/api/supplier')
			.then(({data}) => (this.suppliers = data))
			.catch()
		},
		deleteSupplier(id){
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
					axios.delete('/api/supplier/' + id)
						 .then(() => {
						 	this.suppliers = this.suppliers.filter(supplier => {
						 		return supplier.id != id
						 	})
						 })
						 .catch(() => {
						 	this.$router.push({name: 'supplier'})
						 })

					Swal.fire(
						'Supprimé !',
						'Le fournisseur a bien été supprimé',
						'success'
						)
				}
			})
		}
	},
	mounted(){
		this.allSupplier();
	}
}
</script>

<style lang="css" scoped>
#img_size{
	width: 40px;
}
</style>