class UserController < ActionController::API
  def index
  	@users = User.all
  	p "You made it!!"
  	p "*" * 100
  	render json: @users
  end


end