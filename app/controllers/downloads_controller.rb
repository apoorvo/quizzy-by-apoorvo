# frozen_string_literal: true

class DownloadsController < ApplicationController
  before_action :authenticate_user_session
  before_action :load_attempts_response
  before_action :load_download_record, only: %i[show reports]

  after_action :delete_download_record, only: %i[reports]
  def create
    if Rails.env.production?
      render status: :ok, json: { download_id: "report-download-id" }
    else
      download = ReportDownloaderJob.set(wait: 10.seconds).perform_later(@attempts_response)
      download_record = @current_user.download_records.new(job_id: download.job_id)
      if download_record.save
        render status: :ok, json: { download_id: download.job_id }
      else
        render status: :unprocessable_entity, json: { error: download_record.errors.full_messages.to_sentence }
      end
    end
  end

  def show
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

  def reports
    if Rails.env.production?
      respond_to do |format|
        format.csv {
 send_data ReportDownloadJob.perform_now(@attempts_response), filename: "Attempt-Report-#{Time.zone.today}.csv" }
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

    def load_attempts_response
      @attempts_response = Attempt.load_attempts_response(@current_user.quizzes)
    end

    def delete_download_record
      unless Rails.env.production?
        @download_record.delete
      end
    end
end
