# frozen_string_literal: true

class AddDefaultCountValues < ActiveRecord::Migration[6.1]
  def change
    change_column_default :attempts, :correct_answers_count, 0
    change_column_default :attempts, :incorrect_answers_count, 0
  end
end
