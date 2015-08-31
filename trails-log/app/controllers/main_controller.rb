class MainController < ApplicationController
  include SessionsHelper
  def dashboard
    @trails = current_user.trails
    @trail = Trail.new
    @users = User.all
    if request.xhr?
      respond_to do |format|
        format.html { render layout: false }
      end
    else
      render 'dashboard'
    end
  end

  def landing
  end

  def the_current_user
    @current_user = current_user
    if request.xhr?
      respond_to do |format|
        format.json { render json: @current_user}
      end
    end
  end
end
