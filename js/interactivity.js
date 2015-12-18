var $bigmap = $('#bigmap');
var $citymap = $('#citymap');
var $cities = $citymap.find('.city');
var $info = $('#info');
var $citymapclose = $citymap.find('.close');

var interactiveCities = ['TPE','NTC','TYN','ZMI','TXG','CHW','NAN','YLN','CYI','TNN','KHH','PIF','KEL','HCC','HSZ','CYC','ILA','HUN','TTT','MZG','KNH','MFK'];
for(city of interactiveCities) {
	$bigmap.find('#overview > #ov-' + city).click(function() {
		var $this = $(this);
		var thisCity = $this.attr('id').replace('ov-', '');
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
		var hasOnlyOneDistrict = (city.districts.length < 2);
		var districtName = city.name + (hasOnlyOneDistrict ? '' : ('第' + numerals[thisDistrict])) + '選區';
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
		$info.show();
		$citymapclose.toggleClass('inactive');
	}, function() {
		$info.hide();
		$citymapclose.toggleClass('inactive');
	});
}
$citymapclose.click(function() {
	$bigmap.find('.active').attr('class', '');
	$info.hide();
	$cities.hide();
	$citymap.hide();
});
if($(window).width() < 500)
	$cities.filter('#NTC').find('> .map').scrollLeft(198);
