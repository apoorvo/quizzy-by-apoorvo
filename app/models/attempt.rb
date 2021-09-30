# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz

  has_many :attempt_answers, dependent: :destroy

  def self.load_attempts_response(quizzes)
    attempts = Attempt.where(submitted: true)
    attempts_response = []
    attempts.each do |attempt|
      user = User.find_by(id: attempt[:user_id])
      quiz = quizzes.find_by(id: attempt[:quiz_id])
      attempts_response.push(
        {
          quiz_name: quiz.name, user_name: "#{user.first_name} #{user.last_name}",
          email: user.email, correct_answers_count: attempt[:correct_answers_count],
          incorrect_answers_count: attempt[:incorrect_answers_count],
          attempt_id: attempt[:id]
        })
    end
    attempts_response
  end
end
