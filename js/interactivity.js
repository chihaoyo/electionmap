var $bigmap = $('#bigmap');
var $citymap = $('#citymap');
var $cities = $citymap.find('.city');
var $info = $citymap.find('#district-info');
var $close = $citymap.find('#close');

var t = 0;

var interactiveCities = ['TPE','NTC','TYN','ZMI','TXG','CHW','NAN','YLN','CYI','TNN','KHH','PIF'];
for(city of interactiveCities) {
	$bigmap.find('#cities > #' + city).click(function() {
		var $this = $(this);
		var thisCity = $this.attr('id');
		$this.attr('class', 'active')
		$citymap.show();
		$cities.filter('#' + thisCity).show();
	});
	$cities.filter('#' + city).find('> [id^="' + city + '"]:not([id$="disabled"])').hover(function() {
		var ids = $(this).attr('id').split('-');
		var thisCity = ids[0];
		var thisDistrict = parseInt(ids[1]);

		var city = db[thisCity];
		var district = city.districts[thisDistrict - 1];
		var districtName = city.name + '第' + numerals[thisDistrict] + '選區';
		var districtDetail = '';
		for(subdistrict of district.subdistricts) {
			var html = '<div class="subdistrict">' + subdistrict + '</div>';
			if(subdistrict.indexOf(':') != -1) {
				// a subdistrict with more details
				var buffer = subdistrict.split(':');
				subdistrict = buffer[0];
				buffer = buffer[1].split(',');
				html = '<div class="subdistrict"><div>' + subdistrict + buffer.length + '里</div>' + '<div class="boroughs">' + buffer.map(function(v) { return '<div class="borough">' + v + '</div>'; }).join('') + '</div></div>'
			}
			districtDetail += html;
		}
		$info.find('#name').html(districtName);
		$info.find('#detail').html(districtDetail);
		$info.finish().fadeIn(t);
		$close.toggleClass('inactive');
	}, function() {
		$info.finish().fadeOut(t);
		$close.toggleClass('inactive');
	});
}
$close.click(function() {
	$bigmap.find('.active').attr('class', '');
	$info.hide();
	$cities.hide();
	$citymap.finish().fadeOut(t);
});
