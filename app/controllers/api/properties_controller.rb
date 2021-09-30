class Api::PropertiesController < ApplicationController
  before_action :set_page

  def index
    # render json: Property.available
    properties = Property.page(@page).available
    total_pages = properties.total_pages
    render json: {properties: properties, total_pages:total_pages}
  end

  def cities
    render json: Property.cities
  end

  def city
    # need to pass city data from front end
    render json: Property.by_city(params[:city])
  end

  private

  def set_page
     @page = params[:page] || 1
  end
end
