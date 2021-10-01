Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    get '/things', to:'things#index'
    get '/properties', to: 'properties#index'

    get 'cities', to: 'properties#cities'
    get 'cities/:city', to: 'properties#city'
    get 'agents', to: 'agents#index'
    get 'agents/:id', to:'agents#show'
    get 'buyers/:id', to: 'buyers#show'

    get 'properties/city_cost', to: 'properties#city_cost'
  end 
end
