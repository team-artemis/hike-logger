class SessionsController < ApplicationController
  include SessionsHelper
  respond_to :js, :html

  def new
    @user = User.new
    respond_with new_session_path
  end

  def create
    user = set_user
    if user && user.authenticate(params[:password])
      session[:id] = user.id
      redirect_to user_path(user)
    else
      render :new
  end

  def destroy
    session[:id] = nil
    redirect_to root_path
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
