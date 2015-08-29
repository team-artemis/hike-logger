json.array!(@trails) do |trail|
  json.extract! trail, :id, :title, :length, :duration, :difficulty, :review, :rating
  json.url trail_url(trail, format: :json)
end
