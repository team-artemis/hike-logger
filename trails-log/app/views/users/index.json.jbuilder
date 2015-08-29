json.array!(@users) do |user|
  json.extract! user, :id, :firstname, :lastname, :city, :state, :country, :password_digest, :email
  json.url user_url(user, format: :json)
end
