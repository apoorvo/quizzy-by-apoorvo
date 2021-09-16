# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_session

  def index
    quizzes = Quiz.where(user_id: session[:user_id])
    puts quizzes
    render status: :ok, json: {
      quizzes: quizzes
    }
  end
end
