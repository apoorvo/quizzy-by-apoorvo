# frozen_string_literal: true

class TestJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    puts "Ran"
  end
end
