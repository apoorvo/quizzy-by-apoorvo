# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :authenticate_user_session
  before_action :load_quiz_and_user

  def index
    respond_to do |format|
      format.json { render status: :ok, json: { attempts: @attempts_responses } }
      format.csv {
          send_data ReportDownloaderJob.perform_now(@attempts_responses),
            filename: "Attempt-Report-#{Time.zone.today}.csv" }
    end
  end

  def start_download
    download = ReportDownloaderJob.set(wait: 10.seconds).perform_later(@attempts_responses)
    render status: :ok, json: { download_id: download.job_id }
  end

  private

    def load_quiz_and_user
      attempts = Attempt.where(submitted: true)
      @attempts_responses = []
      attempts.each do |attempt|
        user = User.find_by(id: attempt[:user_id])
        quiz = @current_user.quizzes.find_by(id: attempt[:quiz_id])
        @attempts_responses.push(
          {
            quiz_name: quiz.name, user_name: "#{user.first_name} #{user.last_name}",
            email: user.email, correct_answers_count: attempt[:correct_answers_count],
            incorrect_answers_count: attempt[:incorrect_answers_count],
            attempt_id: attempt[:id]
          })

      end
    end
end