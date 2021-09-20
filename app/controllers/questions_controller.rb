# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_session

  def index
    questions = Question.where(quiz_id: params[:quiz_id])
    render status: :ok, json: { questions: questions }
   end

  def show
    question = Question.find_by!(id: params[:id])
    render status: :ok, json: { question: question }
  end

  def update
    question = Question.find_by!(id: params[:id])
    if question && question.update(question_params)
      render status: :ok, json: { notice: "Successfully updated question." }
    else
      render status: :unprocessable_entity,
        json: { error: question.errors.full_messages.to_sentence }
    end
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

  def destroy
    question = Question.find_by(id: params[:id])
    if question.destroy
      render status: :ok, json: { notice: "Successfully deleted question." }
    else
      render status: :unprocessable_entity,
        json: { error: question.errors.full_messages.to_sentence }
    end
  end

  private

    def question_params
      params.require(:question).permit(
        :name, :quiz_id, :option1, :option2, :option3, :option4, :answer,
        :options_count)
    end
end
