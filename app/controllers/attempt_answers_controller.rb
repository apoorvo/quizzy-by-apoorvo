# frozen_string_literal: true

class AttemptAnswersController < ApplicationController
  before_action :load_user_attempt

  def create
    error = false
    correct_answers_count = 0
    incorrect_answers_count = 0
    params[:attempt_answers].each do |submitted_answer|
      error = false
      answer = @quiz.questions.find_by(id: submitted_answer[:question_id]).answer
      if answer
        attempt_answer = @attempt.attempt_answers.new(
          question_id: submitted_answer[:question_id],
          selected_answer: submitted_answer[:selected_answer], correct_answer: answer)
        if attempt_answer.save
          if attempt_answer[:selected_answer] == answer
            correct_answers_count += 1
          else
            incorrect_answers_count += 1
          end
        else
          render status: :unprocessable_entity,
            json: { error: attempt_answer.errors.full_messages.to_sentence } and return
        end
      end
    end
    if not(error)
      @attempt.update(
        submitted: true, correct_answers_count: correct_answers_count,
        incorrect_answers_count: incorrect_answers_count)
    end
    render json: { notice: "Quiz Submitted", submitted: true }
  end

  def show
    attempt_answers = @attempt.attempt_answers
    render status: :ok, json: { attempt_answers: attempt_answers }
  end

  private

    def load_user_attempt
      @user = User.find_by(id: params[:user_id], role: "standard")
      @attempt = @user.attempts.find_by(quiz_id: params[:quiz_id])
      @quiz = Quiz.find_by(id: params[:quiz_id])
    end
end
