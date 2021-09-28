# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :attempt_answers

  validate :answer_is_valid

  validates :name, presence: true
  validates :option1, presence: true
  validates :option2, presence: true
  validates :answer, presence: true

  private

    def answer_is_valid
      case answer
      when 3
        unless option3
          errors.add(:answer, "is not valid")
        end
      when 4
        unless option4
          errors.add(:answer, "is not valid")
        end
      when not(1..4)
        errors.add(:answer, "is not valid")
      end
    end
end
