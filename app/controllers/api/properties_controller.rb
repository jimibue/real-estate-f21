class Api::PropertiesController < ApplicationController

  def index
    render json: Property.available
  end

  def cities
    render json: Property.cities
  end

  def city
    # need to pass city data from front end
    render json: Property.by_city(params[:city])
  end
end
