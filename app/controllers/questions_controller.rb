# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_session
  before_action :load_quiz
  before_action :load_question, except: %i[index create]

  def index
    if @quiz
      questions = @quiz.questions
      render status: :ok, json: { questions: questions }
    else
      render status: :not_found, json: { error: "Quiz not found" }
    end
   end

  def show
    question = @quiz.questions.find_by!(id: params[:id])
    render status: :ok, json: { question: question }
  end

  def update
    if @question && @question.update(question_params)
      render status: :ok, json: { notice: "Successfully updated question." }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def create
    question = @quiz.questions.new(question_params)
    if question.save
      render status: :ok, json: { notice: t("questions.success") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: "Successfully deleted question." }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def question_params
      params.require(:question).permit(
        :name, :quiz_id, :option1, :option2, :option3, :option4, :answer,
        :options_count)
    end

    def load_quiz
      @quiz = Quiz.find_by(id: params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("quizzes.not_found") }
      end
    end
    def load_question
      @question = @quiz.questions.find_by!(id: params[:id])
      unless @question
        render status: :not_found, json: { error: "Question not found" }
      end
    end
end
