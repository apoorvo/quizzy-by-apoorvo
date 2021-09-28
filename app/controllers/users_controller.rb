# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    user = User.find_by(email: params[:user][:email])
    if user
      if user.role == "administrator"
        render status: :unprocessable_entity, json: { error: "You have entered an admin email." }
      else
        verify_attempt(user)
      end
    else
      user = User.new(default_user_params)
      if user.save
        verify_attempt(user)
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

    def verify_attempt(user)
      attempt = user.attempts.find_by(quiz_id: params[:quiz_id])
      if attempt
        render status: :ok,
          json: {
            notice: "Welcome Back #{user.first_name}", user: user, submitted: attempt.submitted,
            attempt_id: attempt.id
          }
      else
        attempt = user.attempts.new(quiz_id: params[:quiz_id])
        if attempt.save
          render status: :ok,
            json: { notice: "Signed up succefully", user: user, submitted: false, attempt_id: attempt.id }
        else
          render status: :unprocessable_entity, json: { error: attempt.errors.full_messages.to_sentence }
        end
      end
    end
end
