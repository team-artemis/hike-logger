class SessionsController < ApplicationController
  include SessionsHelper

  def new
    @user = User.new
  end

  def create
    user = set_user
    if user && user.authenticate(user_params[:password])
      session[:id] = user.id
      redirect_to user_path(user)
    else
      render :new
    end
  end

  def destroy
    session[:id] = nil
    redirect_to root_path
  end

  private

  def user_params
    params.require(:session).permit(:email, :password)
  end

  def set_user
    @user = User.find_by(email: user_params[:email])
  end
end
