# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  enum role: { standard: 0, administrator: 1 }
  has_secure_password

  has_many :quizzes, dependent: :destroy
  has_many :attempts
  has_many :download_records

  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :password, length: { minimum: 6 }
  validates :password_confirmation, presence: true, on: :create

  before_validation :set_default_password
  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end

    def set_default_password
      unless self.password
        self.password = "password"
        self.password_confirmation = "password"
      end
    end
end
