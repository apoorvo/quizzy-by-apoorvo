# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    name { "" }
    option1 { "MyText" }
    option2 { "MyText" }
    option3 { "MyText" }
  end
end
