# frozen_string_literal: true

class AttemptAnswersController < ApplicationController
  before_action :load_attempt_answers_user
  before_action :load_attempt_answers_attempt

  def create
    params[:attempt_answers].each do |submitted_answer|
        attempt_answer = @attempt.attempt_answers.new(
          question_id: submitted_answer[:question_id],
          selected_answer: submitted_answer[:selected_answer])

        unless attempt_answer.save
          render status: :unprocessable_entity,
            json: { error: attempt_answer.errors.full_messages.to_sentence } and return
        end
      end

    if @attempt.update(submitted: true)
      render status: :ok, json: { notice: "Quiz Submitted", submitted: @attempt.submitted }
    else
      render :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  def show
    attempt_answers = @attempt.attempt_answers
    render status: :ok, json: { attempt_answers: attempt_answers }
  end

  private

    def load_attempt_answers_user
      @user = User.find_by(id: params[:user_id], role: "standard")
    end

    def load_attempt_answers_attempt
      @attempt = @user.attempts.find_by(quiz_id: params[:quiz_id])
    end
end
