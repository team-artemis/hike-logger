module ApplicationHelper

  def avatar_url(user)
    if user.avatar_url.present?
      user.avatar_url
    else
      default_url = "http://imgur.com/8CWEJHv.png"
      gravatar_id = Digest::MD5.hexdigest(user.email.downcase)
      "http://gravatar.com/avatar/#{gravatar_id}.png?s=150&d=#{CGI.escape(default_url)}"
    end
  end
end
