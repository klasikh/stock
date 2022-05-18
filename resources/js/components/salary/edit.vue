<template>
	<div class="row justify-content-center">
		<div class="col-xl-12 col-lg-12 col-md-12">
			<div class="card shadow-sm my-5">
				<div class="card-body p-0">
					<div class="row">
						<div class="col-lg-12">
							<router-link to="/salary" class="btn btn-primary float-right" style="margin-top: 6px;margin-right: 6px;">All Salary</router-link>
							<div class="login-form">
								<div class="text-center">
									<h1 class="h4 text-gray-900 mb-4">Editer salaire</h1>
								</div>
								<form @submit.prevent='updateSalary'>
									<div class="form-group">
										<div class="form-row">
											<div class="col-md-6">
												<label for="exampleFormControlSelect1">Nom</label>
												<input disabled type="text" class="form-control" id="exampleInputFirstName" placeholder="Nom" v-model='form.name'>
											</div>
											<div class="col-md-6">
												<label for="exampleFormControlSelect1">Email</label>
												<input disabled type="email" class="form-control" id="exampleInputEmail" placeholder="Email" v-model='form.email'>
											</div>
										</div>
									</div>

									<input type="hidden" v-model="form.employee_id">

									<div class="form-group">
										<div class="form-row">
											<div class="col-md-6">
												<label for="exampleFormControlSelect1">Salaire</label>
												<input disabled type="number" class="form-control" id="exampleInputSalary" placeholder="Salaire" v-model='form.amount'>
												<small class="text-danger" v-if="errors.amount">{{ errors.amount[0] }}</small>
											</div>
											<div class="col-md-6">
												<label for="exampleFormControlSelect1">Sélectionner le mois</label>
												<select class="form-control" id="exampleFormControlSelect1" v-model="form.salary_month">
													<option value="January">Janvier</option>
													<option value="February">Février</option>
													<option value="March">Mars</option>
													<option value="April">Avril</option>
													<option value="May">Mai</option>
													<option value="June">Juin</option>
													<option value="July">Juillet</option>
													<option value="August">Août</option>
													<option value="September">Septembre</option>
													<option value="October">Octobre</option>
													<option value="November">Novembre</option>
													<option value="December">Décembre</option>
												</select>
												<small class="text-danger" v-if="errors.salary_month"> {{ errors.salary_month[0] }} </small>
											</div>
										</div>
									</div>
									
									<div class="form-group">
										<button type="submit" class="btn btn-primary btn-block">Mettre à jour</button>
									</div>
								</form>
								<div class="text-center">
								</div>
							</div>
						</div>
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
			form:{
				employee_id: '',
				salary_month: '',
				amount: ''
			},
			errors: {}
		}
	},
	mounted(){
		let id = this.$route.params.id
		axios.get('/api/edit-salary/' + id)
			 .then(({data}) => (this.form = data))
			 .catch(console.log('error'))
	},
	methods:{
		updateSalary(){
			let id = this.$route.params.id
			axios.post('/api/update-salary/'+id,this.form)
				 .then(() => {
				this.$router.push({ name: 'allSalary'})
				Notification.success()
			})
			.catch(error =>this.errors = error.response.data.errors)
		},
	}
}
</script>

<style lang="css" scoped>
</style>