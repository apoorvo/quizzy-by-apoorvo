# frozen_string_literal: true

class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.text :name, null: false
      t.text :option1, null: false
      t.text :option2, null: false
      t.text :option3
      t.text :option4
      t.integer :answer, null: false, default: 1
      t.references :quiz, null: false, foreign_key: true

      t.timestamps
    end
  end
end
