# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_session

  def index
    quizzes = Quiz.where(user_id: @current_user.id)
    render status: :ok, json: {
      quizzes: quizzes
    }
  end

  def create
    quiz = Quiz.new(quiz_params, user_id: @current_user.id)
    if quiz.save
      render status: :ok, json: { notice: "Task was successfully created" }
    else
      errors = task.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
