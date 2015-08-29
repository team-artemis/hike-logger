json.array!(@images) do |image|
  json.extract! image, :id, :title, :caption, :src
  json.url image_url(image, format: :json)
end
