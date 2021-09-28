# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :authenticate_user_session
  before_action :load_quiz_and_user

  def index
    render status: :ok, json: { attempts: @attempts_response }
  end

  private

    def load_quiz_and_user
      attempts = Attempt.where(submitted: true)
      @attempts_response = []
      attempts.each do |attempt|
        user = User.find_by(id: attempt[:user_id])
        quiz = @current_user.quizzes.find_by(id: attempt[:quiz_id])
        @attempts_response.push(
          {
            quiz_name: quiz.name, user_name: "#{user.first_name} #{user.last_name}",
            email: user.email, correct_answers_count: attempt[:correct_answers_count],
            incorrect_answers_count: attempt[:incorrect_answers_count]
          })

      end
    end
end
