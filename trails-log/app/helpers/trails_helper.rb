module TrailsHelper

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
        :'marker-size' => 'large',
        :'images' => trail.images
        }
      }
    end


  end
end