<template>
	<div class="row justify-content-center">
		<div class="col-xl-12 col-lg-12 col-md-12">
			<div class="row">
				<div class="col-lg-12 mb-4">
					<!-- Simple Tables -->
					<div class="card">
						<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
							<h2 class="m-0 font-weight-bold text-primary">Mois</h2>
							<router-link to="/given-salary" class="btn btn-primary float-right" style="margin-top: 6px;margin-right: 6px;">Salaires payés</router-link>
							<input type="text" placeholder="Rechercher" v-model="searchTerm" class="form-control" style="width: 300px;">
						</div>
						<div class="table-responsive">
							<table class="table align-items-center table-flush">
								<thead class="thead-light">
									<tr>
										<th>Mois</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="salary in filtersearch" :key="salary.id">
										<td>{{ salary.salary_month }}</td>
										<td>
											<router-link :to="{name: 'viewSalary', params: {month: salary.salary_month}}" class="btn btn-sm btn-primary"><i class="fa fa-eye"></i></router-link>
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
			salaries: [],
			searchTerm:""
		}
	},
	computed: {
		filtersearch(){
			return this.salaries.filter(salary => {
				return salary.salary_month.match(this.searchTerm)
			})
		}
	},
	methods: {
		allSalary(){
			axios.get('/api/salary')
			.then(({data}) => (this.salaries = data))
			.catch()
		}
	},
	mounted(){
		this.allSalary();
	}
}
</script>

<style lang="css" scoped>
#img_size{
	width: 40px;
}
</style>