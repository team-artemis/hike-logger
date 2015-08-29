class SessionsController < ApplicationController
  include SessionsHelper
  respond_to :js, :html

  def new
    p 'hello'
    @user = User.new
    render file: :new, content_type: "html"
  end

  def create
    user = set_user
    if user && user.authenticate(params[:password])
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

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
