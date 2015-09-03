class Trail < ActiveRecord::Base

  belongs_to :user
  before_create :get_trail_city_and_state

  def get_trail_city_and_state
    location = Geokit::LatLng.new(self.trailhead_lat, self.trailhead_lon)
    self.city = location.reverse_geocode.city
    self.state = location.reverse_geocode.state
  end

end
