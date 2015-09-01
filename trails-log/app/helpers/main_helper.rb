module MainHelper

  def reverse_geocode(trailhead_lat, trailhead_lon)
    location = Geokit::LatLng.new(trailhead_lat, trailhead_lon)
    city = location.reverse_geocode.city
    state = location.reverse_geocode.state
    return [city, state].join(', ')
  end
end
