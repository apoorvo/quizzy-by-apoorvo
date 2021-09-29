# frozen_string_literal: true

class ReportDownloaderJob < ApplicationJob
  queue_as :default
  after_perform :set_status

  def perform(attempts_responses)
    # Do something later
    attributes = %w[attempt_id quiz_name user_name email correct_answers_count incorrect_answers_count]
    @csv_content = CSV.generate(headers: true) do |csv|
      csv << attributes
      attempts_responses.each do |attempts_response|
        csv << attempts_response.stringify_keys.values_at(*attributes)
      end
    end
  end

  private

    def set_status
      download_record = DownloadRecord.find_by(job_id: self.job_id)
      if download_record
        download_record.update({ completed: true, content: @csv_content })
      end
    end
end
