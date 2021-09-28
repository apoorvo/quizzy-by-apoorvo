# frozen_string_literal: true

class ReportDownloaderJob < ApplicationJob
  queue_as :default

  def perform(attempts_responses)
    # Do something later
    puts "Started"
    puts "#{attempts_responses}"
    attributes = %w[attempt_id quiz_name user_name email correct_answers_count incorrect_answers_count]
    puts "#{attributes}"
    CSV.generate(headers: true) do |csv|
      csv << attributes
      attempts_responses.each do |attempts_response|
        csv << attempts_response.stringify_keys.values_at(*attributes)
      end
    end
  end
end
