# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy

  validates :slug, uniqueness: true, allow_nil: true
  validates :name, presence: true, length: { maximum: 50 }

  def set_slug
    name_slug = name.parameterize
    if Quiz.exists?(slug: name_slug)
      name_slug = "#{name_slug}-#{id}"
    end
    self.slug = name_slug
  end
end
