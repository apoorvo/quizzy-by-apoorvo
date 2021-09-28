# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :authenticate_user_session
  before_action :load_quiz_and_user, except: %i[download_report download_status]
  before_action :load_download_record, only: %i[download_status download_report]

  after_action :delete_download_record, only: %i[download_report]

  def index
    respond_to do |format|
      format.json { render status: :ok, json: { attempts: @attempts_responses } }
      format.csv {
          send_data ReportDownloaderJob.perform_now(@attempts_responses),
            filename: "Attempt-Report-#{Time.zone.today}.csv" }
    end
  end

  def download_start
    if Rails.env.production?
      render status: :ok, json: { download_id: "report-download-id" }
    else
      download = ReportDownloaderJob.set(wait: 10.seconds).perform_later(@attempts_responses)
      download_record = @current_user.download_records.new(job_id: download.job_id)
      if download_record.save
        render status: :ok, json: { download_id: download.job_id }
      else
        render status: :unprocessable_entity, json: { error: download_record.errors.full_messages.to_sentence }
      end
    end
  end

  def download_status
    if Rails.env.production?
      render status: :ok, json: { status: true }
    else
      if @download_record
        render status: :ok, json: { status: @download_record.completed }
      else
        render status: :unprocessable_entity, json: { error: @download_record.errors.full_messages.to_sentence }
      end
    end
  end

  def download_report
    if Rails.env.production?
      respond_to do |format|
        format.csv { send_data ReportDownloaderJob.perform_now(@attempts_responses) }
      end
    else
      if @download_record
        respond_to do |format|
          format.csv { send_data @download_record.content, filename: "Attempt-Report-#{Time.zone.today}.csv" }
        end
      else
        render status: :unprocessable_entity, json: { error: @download_record.errors.full_messages.to_sentence }
      end
    end
  end

  private

    def load_download_record
      unless Rails.env.production?
        @download_record = DownloadRecord.find_by(job_id: params[:job_id])
      end
    end

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

    def delete_download_record
      unless Rails.env.production?
        @download_record.delete
      end
    end
end
