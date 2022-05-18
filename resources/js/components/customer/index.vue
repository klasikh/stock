<template>
	<div class="row justify-content-center">
		<div class="col-xl-12 col-lg-12 col-md-12">
			<div class="row">
				<div class="col-lg-12 mb-4">
					<!-- Simple Tables -->
					<div class="card">
						<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
							<h2 class="m-0 font-weight-bold text-primary">Liste des clients</h2>
							<router-link to="/store-customer" class="btn btn-primary float-right" style="margin-top: 6px;margin-right: 6px;">Ajouter client</router-link>
							<input type="text" placeholder="Rechercher" v-model="searchTerm" class="form-control" style="width: 300px;">
						</div>
						<div class="table-responsive">
							<table class="table align-items-center table-flush">
								<thead class="thead-light">
									<tr>
										<th>Nom</th>
										<th>Photo</th>
										<th>Tel</th>
										<th>Email</th>
										<th>Adresse</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="customer in filtersearch" :key="customer.id">
										<td>{{ customer.name }}</td>
										<td><img :src="customer.photo" id="img_size"></td>
										<td>{{ customer.phone }}</td>
										<td>{{ customer.email }}</td>
										<td>{{ customer.address }}</td>
										<td>
											<router-link :to="{name: 'editCustomer', params: {id: customer.id}}" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></router-link>
											<a @click="deleteCustomer(customer.id)" class="btn btn-sm btn-danger" style="color: white"><i class="fa fa-trash"></i></a>
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
			customers: [],
			searchTerm:""
		}
	},
	computed: {
		filtersearch(){
			return this.customers.filter(customer => {
				return customer.phone.match(this.searchTerm)
			})
		}
	},
	methods: {
		allCustomer(){
			axios.get('/api/customer')
			.then(({data}) => (this.customers = data))
			.catch()
		},
		deleteCustomer(id){
			Swal.fire({
				title: 'Êtes-vous sûr ?',
				text: "Cette action est irréversible ! La suppression d'un client supprime également toutes les données d'achat liées à ce client",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Oui, supprimer!',
				cancelButtonText: 'Annuler'
			}).then((result) => {
				if (result.isConfirmed) {
					axios.delete('/api/customer/' + id)
						 .then(() => {
						 	this.customers = this.customers.filter(customer => {
						 		return customer.id != id
						 	})
						 })
						 .catch(() => {
						 	this.$router.push({name: 'customer'})
						 })

					Swal.fire(
						'Supprimé !',
						'Le client a été supprimé avec succès',
						'success'
						)
				}
			})
		}
	},
	mounted(){
		this.allCustomer();
	}
}
</script>

<style lang="css" scoped>
#img_size{
	width: 40px;
}
</style>