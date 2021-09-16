# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ActionView::Helpers::TranslationHelper

  def authenticate_user_session
    if session[:user_id]
      @current_user = User.find_by(id: session[:user_id])
    else
      render status: :unauthorized, json: {
        error: t("session.could_not_auth")
      }
    end
  end
end
