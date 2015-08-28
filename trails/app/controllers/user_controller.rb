class UsersController < ActionController::API
	 protect_from_forgery with: :null_session

	 def index
	 	"hello"
	 end
end
