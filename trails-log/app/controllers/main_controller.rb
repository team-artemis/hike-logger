class MainController < ApplicationController
  include SessionsHelper
  include TrailsHelper
  include ApplicationHelper

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
    if logged_in?
      if current_user.trails
        @trails = current_user.trails
      end
      @trail = Trail.new
      @users = User.all
      render 'dashboard'
    elsif request.xhr?
      respond_to do |format|
        format.html { render layout: false }
      end
    else
      render 'landing'
    end
  end

  def the_current_user
    @current_user = current_user
    if request.xhr?
      respond_to do |format|
        format.json { render json: @current_user}
      end
    end
  end

  def the_current_trail_path
    @current_trail = Trail.find_by(id: params[:id])
    @response = HTTParty.get("https://api.mapbox.com/v4/directions/mapbox.walking/#{@current_trail.waypoints}.json?access_token=pk.eyJ1IjoiYW5kcmV3cGF0dGVyc29uMzAwMSIsImEiOiI5YjZkYWY4ZTgzNTQzNzcwZjg1M2YxYmFhMjU3NWY5OSJ9.6FMHigG3xoaQ5zd-rKWBpg")
     # body["origin"]["geometry"]["coordinates"]
    @body = JSON.parse(@response.body)
    if request.xhr?
      respond_to do |format|
        format.json { render json: @body}
      end
    end
  end

  private

end
