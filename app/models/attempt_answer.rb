# frozen_string_literal: true

class AttemptAnswer < ApplicationRecord
  belongs_to :attempt
  belongs_to :question

  validates :question_id, uniqueness: { scope: :attempt_id }

  before_save :set_correct_answer, :set_attempt_answer_count

  private

    def set_correct_answer
      answer = Question.find_by(id: self.question_id).answer
      self.correct_answer = answer
    end

    def set_attempt_answer_count
      if self.selected_answer == self.correct_answer
        correct_answers_count = self.attempt.correct_answers_count
        self.attempt.update(correct_answers_count: correct_answers_count + 1)
      else
        incorrect_answers_count = self.attempt.incorrect_answers_count
        self.attempt.update(incorrect_answers_count: incorrect_answers_count + 1)
      end
    end
end
