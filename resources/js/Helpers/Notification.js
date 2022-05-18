class Notification{

	success(){
		new Noty({
			type: 'success',
			layout: 'topRight',
			text: 'Effectué avec succès !',
			timeout: 1000,
		}).show();
	}

	alert(){
		new Noty({
			type: 'alert',
			layout: 'topRight',
			text: 'Êtes-vous sûr ?',
			timeout: 1000,
		}).show();
	}

	warning(){
		new Noty({
			type: 'warning',
			layout: 'topRight',
			text: 'Oups erreur !',
			timeout: 1000,
		}).show();
	}

	error(){
		new Noty({
			type: 'error',
			layout: 'topRight',
			text: 'Une erreur s\'est produite !',
			timeout: 1000,
		}).show();
	}

	image_validation(){
		new Noty({
			type: 'error',
			layout: 'topRight',
			text: 'Tla taille du fichier doit est inférieure à 1MB!',
			timeout: 2000,
		}).show();
	}

	cart_success(){
		new Noty({
			type: 'success',
			layout: 'topRight',
			text: 'Ajouté au panier avec succès !',
			timeout: 2000,
		}).show();
	}

	cart_delete(){
		new Noty({
			type: 'error',
			layout: 'topRight',
			text: 'Produit retiré du panier !',
			timeout: 2000,
		}).show();
	}
}

export default Notification = new Notification()