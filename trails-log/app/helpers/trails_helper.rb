module TrailsHelper
  
  class GeojsonBuilder

    def self.build_trail_point(trail)
       {
         type: "Feature",
         geometry: {
           type: "Point",
           coordinates: [trail.trailhead_lon, trail.trailhead_lat]
         },
         properties: {
           title: trail.title,
           review: trail.review,
           :'marker-color' => '#00607d',
           :'marker-symbol' => 'park',
           :'marker-size' => 'large'
         }
       }
    end


  end
end
