$(function() {
	var root = $('#root');

	window.addEventListener('hashchange', handleRoute);

	handleRoute();

	function handleRoute() {
		var route = (window.location.hash) ? window.location.hash.replace('#/', '') : '';

		root.html('');

		if (route.match(/\d+/) === null) {
			renderList();
		} else {
			renderDetail(route)
		};
	}

	function renderDetail(id) {

		$.ajax({
			url: '/api/' + id + '.json',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				var template = Handlebars.compile($('#template-item-detail').text());
				var html = template(data);
				root.html(html);
			},
			error: function() {
				alert('I broke :-(')
			}
		});
	}

	function renderList() {

		$.ajax({
			url: '/api/list.json',
			type: 'GET',
			dataType: 'json',
			success: function(data) {

				var template = Handlebars.compile($('#template-item-list').text());
				var html = template(data);
				root.html(html);
			},
			error: function() {
				alert('I broke :-(')
			}
		});
	}
});