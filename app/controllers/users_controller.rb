# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    user = User.find_by(email: params[:user][:email])
    if user
      if user.role == "administrator"
        render status: :unprocessable_entity, json: { error: "You have entered an admin email." }
      else
        render json: { notice: "User already present", user: user }
      end
    else
      user = User.new(default_user_params)
      if user.save
        render status: :ok, json: { notice: "User succesfully created", user: user }
      else
        errors = user.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
  end

  private

    def default_user_params
      params[:user].merge!(password: "password", password_confirmation: "password")
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :role, :password_confirmation)
    end
end
