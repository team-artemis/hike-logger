module TrailsHelper

  Geokit::Geocoders::GoogleGeocoder.api_key = 'AIzaSyCDDyToOS_3CYekY0fDAUZXD6A0CJXCbPM'
  def reverse_geocode(trailhead_lat, trailhead_lon)
    location = Geokit::LatLng.new(trailhead_lat, trailhead_lon)
    city = location.reverse_geocode.city
    state = location.reverse_geocode.state
    return [city, state].join(', ')
  end

  def get_trail_owner(trail_object)
    User.find_by(trail_object.user_id)
  end

  class GeojsonBuilder

    def self.build_trail_point(trail)
     {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [trail.trailhead_lon, trail.trailhead_lat]
      },
      properties: {
        id: trail.id,
        title: trail.title,
        review: trail.review,
        user: trail.user_id,
        :'marker-color' => '#00607d',
        :'marker-symbol' => 'park',
        :'marker-size' => 'large'
        }
      }
    end


  end
end