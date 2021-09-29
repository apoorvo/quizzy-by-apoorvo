# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: login_params[:email].downcase)
    if @user.present? && @user.authenticate(login_params[:password])
      session[:user_id] = @user.id
      render status: :ok, json: {
        user: @user.id,
        notice: t("session.success")
      }
    else
      render status: :unauthorized, json: { error: t("session.incorrect_credentials") }
    end
  end

  def destroy
    reset_session
    render json: { status: 200, logged_out: true }
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
