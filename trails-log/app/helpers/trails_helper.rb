module TrailsHelper
  def self.build_trail_pin(trail)
     {
       type: "Feature",
       geometry: {
         type: "Point",
         coordinates: [trail.trailhead_lon, trail.trailhead_lat]
       },
       properties: {
         title: trail.title,
         review: trail.review,
         :"marker-color" => "#00607d",
         :"marker-symbol" => "tree",
         :"marker-size" => "large"
       }
     }    
  end

end
