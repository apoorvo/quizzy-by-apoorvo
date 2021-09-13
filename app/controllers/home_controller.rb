# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    @user = false
    if session[:user_id]
      @user = User.find_by(id: session[:user_id])
    end
    render
  end
end
