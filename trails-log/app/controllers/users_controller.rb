class UsersController < ApplicationController
  include SessionsHelper
  include TrailsHelper
  include MainHelper

  before_action :set_user, only: [:show, :edit, :update, :destroy]

 
  def index
    @users = User.all
    respond_to do |format|
      format.html { render layout: false }
      format.json { render json: @users }
    end
  end

  def show
    @trails = current_user.trails
    @trail = Trail.new
    @users = User.all
    if request.xhr?
      respond_to do |format|
        format.html { render layout: false }
      end
    else
      render 'show'
    end
  end


  def new
    @user = User.new
    render 'new'
  end


  def edit
    render 'edit'
  end

  def create
    @user = User.new(user_params)

    # respond_to do |format|
    if @user.save
      log_in(@user)
      redirect_to @user
        # format.html { redirect_to user_path(@user), notice: 'User was successfully created.' }
        # format.json { render :show, status: :created, location: @user }
      else
        render :new
        # format.html { render :new }
        # format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    # end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:firstname, :lastname, :city, :state, :country, :password, :email)
    end

    def set_user
      @user = User.find_by(id: params[:id])
    end
  end
