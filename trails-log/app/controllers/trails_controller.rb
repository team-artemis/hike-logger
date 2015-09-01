class TrailsController < ApplicationController
  before_action :set_trail, only: [:show, :edit, :update, :destroy]
  include TrailsHelper

  def all_trails
    @trails = Trail.all
    @geojson = Array.new
    build_geojson(@trails, @geojson)

    respond_to do |format|
      # format.html
      format.json { render json: @geojson }
    end
    # render 'index'
  end

  def build_geojson(trails, geojson)
    trails.each do |trail|
      geojson << GeojsonBuilder.build_trail_point(trail)
    end
  end

  def index
    user = User.find_by(id: params[:user_id])
    @trails = user.trails
    @geojson = Array.new
    build_geojson(@trails, @geojson)
    respond_to do |format|
      format.html
      format.json { render json: @geojson }
    end

  end

  def build_geojson(trails, geojson)
    trails.each do |trail|
      geojson << GeojsonBuilder.build_trail_point(trail)
    end
  end

  def show
    @trail = set_trail

    if request.xhr?
      render 'show', layout: false
    end
  end

  def new
    @trail = Trail.new
    respond_to do |format|
      format.html { render layout: false }
      format.json { render json: @trail }
    end
  end

  def edit
    @trail = set_trail
    @trail.update_attributes(trail_params)
    redirect_to user_trail_path(@trail)
  end

  def create
    @trail = Trail.new(trail_params)
    respond_to do |format|
      if @trail.save
        if request.xhr?
          format.html {render 'show', layout: false}
        end
      end
    end

  end

  def update
    respond_to do |format|
      if @trail.update(trail_params)
        format.html { redirect_to @trail, notice: 'Trail was successfully updated.' }
        format.json { render :show, status: :ok, location: @trail }
      else
        format.html { render :edit }
        format.json { render json: @trail.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @trail.destroy
    respond_to do |format|
      format.html { redirect_to trails_url, notice: 'Trail was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def set_trail
      @trail = Trail.find(params[:id])
    end

    def trail_params
      params.require(:user_trails).permit(:title, :length, :duration, :difficulty, :review, :rating, :trailhead_lat, :trailhead_lon, :trailend_lat, :trailend_lon, :waypoints, :user_id)
    end
end
