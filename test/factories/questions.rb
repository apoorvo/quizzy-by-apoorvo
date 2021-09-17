# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    name { "Quiz" }
    option1 { "MyText" }
    option2 { "MyText" }
    option3 { "MyText" }
    answer { Faker::Number.between(from: 1, to: 4) }
  end
end
