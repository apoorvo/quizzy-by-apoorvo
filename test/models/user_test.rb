# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = build(:user)
  end
  def test_user_should_be_valid
    assert @user.valid?
  end
  def test_first_name_should_be_present
    @user.first_name = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end
  def test_last_name_should_be_present
    @user.last_name = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name can't be blank"
  end
  def test_email_should_be_present
    @user.email = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end
  def test_first_name_should_be_of_valid_length
    @user.first_name = "a" * 60
    assert @user.invalid?
  end
  def test_last_name_should_be_of_valid_length
    @user.first_name = "a" * 60
    assert @user.invalid?
  end
  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!

    test_user = @user.dup
    assert_not test_user.valid?

    assert_includes test_user.errors.full_messages, "Email has already been taken"
  end
  def test_email_should_be_saved_in_lowercase
    uppercase_email = "SAM@EMAIL.COM"
    @user.email = uppercase_email
    @user.save!
    assert_equal uppercase_email.downcase, @user.email
  end
  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
      first.last@example.in user+one@example.ac.in]

    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end
  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.
    @sam-sam.com sam@sam+exam.com fishy+#.com]

    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end
  def test_new_email_with_uppercase_name_should_not_be_created
    @user.email = "sam@example.com"
    @user.save!
    assert_raises ActiveRecord::RecordNotUnique do
      test_user = User.create(
        first_name: "Oliver", last_name: "Smith", email: "SAM@example.com", password: "welcome",
        password_confirmation: "welcome")
    end
  end

  def test_user_should_not_have_invalid_role
    exception = assert_raises(Exception) { @user.role = 3 }
    assert_includes exception.message, "'3' is not a valid role"
  end

  def test_user_should_not_be_saved_without_password
    @user.password = nil
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password can't be blank"
  end

  def test_password_should_not_be_less_than_minimum_length
    @user.password = "1234"
    @user.password_confirmation = "1234"
    assert @user.invalid?
  end

  def test_user_should_not_be_saved_without_password_confirmation
    @user.password_confirmation = nil
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password confirmation can't be blank"
  end

  def test_user_should_match_password_and_password_confirmation
    @user.password_confirmation = "#{@user.password}-random"
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end
end
