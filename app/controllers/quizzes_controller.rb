# frozen_string_literal: true

class QuizzesController < ApplicationController
  def index
    quizzes = Quiz.find_by(user_id: session[:user_id])
    render status: :ok, json: {
      quizzes: quizzes
    }
  end
end
