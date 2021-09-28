# frozen_string_literal: true

class ReportDownloadJob < ApplicationJob
  queue_as :default

  def perform(attempts_responses)
    # Do something later
    attributes = %w[attempt_id quiz_name user_name email correct_answers_count incorrect_answers_count]
    CSV.generate(headers: true) do |csv|
      csv << attributes
      attempts_responses.each do |attempts_response|
        csv << attempts_response.stringify_keys.values_at(*attributes)
      end
    end
  end
end
