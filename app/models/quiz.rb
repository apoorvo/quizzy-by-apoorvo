# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy

  validates :slug, uniqueness: true, allow_nil: true
  validates :name, presence: true, length: { maximum: 50 }

  def set_slug
    name_slug = name.parameterize
    latest_quiz_slug = Quiz.where(
      "slug LIKE ? or slug LIKE ?",
      "#{name_slug}",
      "#{name_slug}-%"
    ).order(slug: :desc).first&.slug
    slug_count = 0
    if latest_quiz_slug.present?
      slug_count = latest_quiz_slug.split("-").last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end
    slug_candidate = slug_count.positive? ? "#{name_slug}-#{slug_count + 1}" : name_slug
    self.slug = slug_candidate
  end
end
