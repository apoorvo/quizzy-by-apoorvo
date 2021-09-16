# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def authenticate_user_session
    if session[:user_id]
      @current_user = User.find_by(id: session[:user_id])
    else
      render status: :unauthorized, json: {
        error: "Could not authenticate user"
      }
    end
  end
end
