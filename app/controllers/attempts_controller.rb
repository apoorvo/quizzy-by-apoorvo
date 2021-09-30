# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :authenticate_user_session
  before_action :load_attempts_response

  def index
    respond_to do |format|
      format.json { render status: :ok, json: { attempts: @attempts_response } }

    end
  end

  private

    def load_attempts_response
      @attempts_response = Attempt.load_attempts_response(@current_user.quizzes)
    end
end
