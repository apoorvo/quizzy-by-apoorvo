# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @question = build(:question)
  end

  def test_option1_should_not_be_present
    @question.option1 = nil
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Option1 can't be blank"
  end

  def test_option2_should_not_be_present
    @question.option2 = nil
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Option2 can't be blank"
  end

  def test_answer_should_not_refer_to_nil_option
    @question.answer = 4
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Answer is not valid"
  end

  def test_question_should_have_one_answer
    @question.answer = [1, 3]
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Answer can't be blank"
  end
end
