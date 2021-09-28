# frozen_string_literal: true

class PublicviewController < ApplicationController
  before_action :authenticate_user_session, only: %i[create]

  def show
    quiz = Quiz.find_by(slug: params[:slug])
    if quiz
      render status: :ok, json: {
        quiz: quiz
      }
    else
      render status: :not_found, json: { error: "Not a valid slug" }
    end
  end

  def create
    quiz = @current_user.quizzes.find_by(id: params[:id])
    if quiz.slug.blank?
      quiz.set_slug
      if quiz.save
        render status: :ok, json: {
          quiz: quiz
        }
      end
    else
      render json: { notice: "Already published." }
    end
  end
end
