module SessionsHelper

  def log_in(user)
    session[:id] = user.id
  end

  def log_out
    session.delete(:id)
    @current_user = nil
  end

  def logged_in?
    session[:id] != nil
  end

  def current_user
    @current_user ||= User.find_by(id: session[:id])
  end
end
