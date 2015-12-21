var $bigmap = $('#bigmap');
var $citymap = $('#citymap');
var $cities = $citymap.find('.city');
var $info = $('#info');
var $close = $info.find('#close');

var showDetail = function(assignedCityID) {
	var ids, thisCity, thisDistrict;
	if(assignedCityID.target === undefined) { // not an event; auto show detail
		ids = undefined;
		thisCity = assignedCityID;
		thisDistrict = 1;
	}
	else {
		ids = $(this).attr('id').split('-');
		thisCity = ids[0];
		thisDistrict = parseInt(ids[1]);
	}

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
			html = '<div class="subdistrict"><div>' + subdistrict + buffer.length + (thisCity != 'MAB' && thisCity != 'LAB' ? '里' : '行政區') + '</div>' + '<div class="boroughs">' + buffer.map(function(v) { return '<div class="borough">' + v + '</div>'; }).join('') + '</div></div>'
		}
		districtDetail += html;
	}
	var url = 'constituencies/' + thisCity + '/' + thisDistrict;
	console.log(url);
	$info.find('#go').attr('href', url);
	$info.find('#name').html(districtName);
	$info.find('#detail').html(districtDetail);
	$info.show();
}

var interactiveCities = ['TPE','NTC','TYN','ZMI','TXG','CHW','NAN','YLN','CYI','TNN','KHH','PIF','KEL','HCC','HSZ','CYC','ILA','HUN','TTT','MZG','KNH','MFK','MAB','LAB'];
for(city of interactiveCities) {
	$bigmap.find('#overview > #ov-' + city).click(function() {
		var $this = $(this);
		var thisCity = $this.attr('id').replace('ov-', '');
		$this.attr('class', 'active')
		$citymap.show();
		$cities.filter('#' + thisCity).show();
		if((db[thisCity]).districts.length < 2)
			showDetail(thisCity);
	});
	$cities.filter('#' + city).find('> [id^="' + city + '"]:not([id$="disabled"])').click(showDetail);//.hover(showDetail);
}
$close.click(function() {
	if($bigmap.is(':visible')) { // desktop UI
		$bigmap.find('.active').attr('class', '');
		$info.hide();
		$cities.hide();
		$citymap.hide();
	}
	else { // mobile UI
		$info.hide();
	}
});
if($(window).width() < 500)
	$cities.filter('#NTC').find('> .map').scrollLeft(198);
