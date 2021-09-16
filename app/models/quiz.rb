# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { maximum: 50 }, uniqueness: true
  before_validation :set_name

  private

    def set_name
      count = Quiz.where("name LIKE ?", "#{name}%").size
      name_candidate = count.positive? ? "#{name} #{count + 1}" : name
      self.name = name_candidate
    end
end
