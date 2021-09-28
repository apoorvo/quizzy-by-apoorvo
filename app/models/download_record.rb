# frozen_string_literal: true

class DownloadRecord < ApplicationRecord
  belongs_to :user

  validates :job_id, presence: true, uniqueness: true
  validates :completed, inclusion: [true, false]
end
