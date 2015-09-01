class SessionsController < ApplicationController
  include SessionsHelper

  def new
    @user = User.new
  end

  def create
    user = User.find_by(email: user_params[:email])
    if user && user.authenticate(user_params[:password])
      session[:id] = user.id
      redirect_to '/dashboard'
    else
      render :new
    end
  end

  def destroy
    log_out
    redirect_to root_path
  end

  private

  def user_params
    params.require(:session).permit(:email, :password)
  end

end
