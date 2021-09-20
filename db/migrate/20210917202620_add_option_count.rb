# frozen_string_literal: true

class AddOptionCount < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :options_count, :integer, null: false
  end
end
