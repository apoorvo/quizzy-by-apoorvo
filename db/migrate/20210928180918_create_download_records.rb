# frozen_string_literal: true

class CreateDownloadRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :download_records do |t|
      t.string :job_id, null: false, index: { unique: true }
      t.boolean :completed, null: false, default: false
      t.text :content
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
