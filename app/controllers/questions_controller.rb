# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_session

  def index
    questions = Question.where(quiz_id: params[:quiz_id])
    render status: :ok, json: { questions: questions }
   end

  def create
    question = Question.new(question_params)
    if question.save
      render status: :ok, json: { notice: t("questions.success") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def question_params
      params.require(:question).permit(:name, :quiz_id, :id, :option1, :option2, :option3, :option4, :answer)
    end
end
