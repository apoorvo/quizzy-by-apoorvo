# frozen_string_literal: true

require "sidekiq/web"

Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resource :sessions, only: %i[create destroy]
  resources :publicview, only: %i[show create], param: :slug
  resources :quizzes, only: %i[index create update destroy]
  resources :questions, only: %i[index show update create destroy]
  resources :users, only: %i[create]
  resources :attempt_answers, only: %i[create show]
  resources :attempts, only: %i[index]
  resources :downloads, only: %i[show create], param: :job_id

  get "/downloads/reports/:job_id", to: "downloads#reports"
  root "home#index"
  get "*path", to: "home#index", via: :all
end
