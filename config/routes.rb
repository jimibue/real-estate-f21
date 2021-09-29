Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    get '/things', to:'things#index'
    get '/properties', to: 'properties#index'

    get 'cities', to: 'properties#cities'
    get 'cities/:city', to: 'properties#city'
  end 
end
