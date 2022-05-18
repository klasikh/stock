<template>
	<div class="row justify-content-center">
		<div class="col-xl-12 col-lg-12 col-md-12">
			<div class="row">
				<div class="col-lg-12 mb-4">
					<!-- Simple Tables -->
					<div class="card">
						<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
							<h2 class="m-0 font-weight-bold text-primary">Liste des employés</h2>
							<router-link to="/store-employee" class="btn btn-primary float-right" style="margin-top: 6px;margin-right: 6px;">Ajouter un employé</router-link>
							<input type="text" placeholder="Rechercher" v-model="searchTerm" class="form-control" style="width: 300px;">
						</div>
						<div class="table-responsive">
							<table class="table align-items-center table-flush">
								<thead class="thead-light">
									<tr>
										<th>Nom</th>
										<th>Photo</th>
										<th>Tel</th>
										<th>Salaire</th>
										<th>Date de début de fonction</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="employee in filtersearch" :key="employee.id">
										<td>{{ employee.name }}</td>
										<td><img :src="employee.photo" id="img_size"></td>
										<td>{{ employee.phone }}</td>
										<td>{{ employee.salary }}</td>
										<td>{{ employee.joining_date }}</td>
										<td>
											<router-link :to="{name: 'editEmployee', params: {id: employee.id}}" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></router-link>
											<a @click="deleteEmployee(employee.id)" class="btn btn-sm btn-danger" style="color: white"><i class="fa fa-trash"></i></a>
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
			employees: [],
			searchTerm:""
		}
	},
	computed: {
		filtersearch(){
			return this.employees.filter(employee => {
				return employee.phone.match(this.searchTerm)
			})
		}
	},
	methods: {
		allEmployee(){
			axios.get('/api/employee')
			.then(({data}) => (this.employees = data))
			.catch()
		},
		deleteEmployee(id){
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
					axios.delete('/api/employee/' + id)
						 .then(() => {
						 	this.employees = this.employees.filter(employee => {
						 		return employee.id != id
						 	})
						 })
						 .catch(() => {
						 	this.$router.push({name: 'employee'})
						 })

					Swal.fire(
						'Supprimé !',
						'Employé supprimé avec succès',
						'success'
						)
				}
			})
		}
	},
	mounted(){
		this.allEmployee();
	}
}
</script>

<style lang="css" scoped>
#img_size{
	width: 40px;
}
</style>